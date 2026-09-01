const { app, BrowserWindow, ipcMain, dialog, safeStorage, shell } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

const BACKEND_PORT = 5066;
let backendProcess = null;
let mainWindow = null;

const logPath = path.join(app.getPath('userData'), 'backend.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

function getBackendExePath() {
    const backendFolder = app.isPackaged
    ? path.join(process.resourcesPath, 'backend')
    : path.join(__dirname, 'resources', 'backend');

    return path.join(backendFolder, 'ValidacionInventario.Api.exe');
}

    function startBackend() {
        const exePath = getBackendExePath();

        backendProcess = spawn(exePath, [], {
            env: { ...process.env, ASPNETCORE_URLS: `http://localhost:${BACKEND_PORT}` },
        });

        backendProcess.stdout.on('data', (data) => logStream.write(`[backend] ${data}`));
        backendProcess.stderr.on('data', (data) => logStream.write(`[backend-error] ${data}`));

        backendProcess.on('exit', (code) => {
            logStream.write(`Backend cerrado con código ${code}\n`);
        });
}

function waitForBackend(retriesLeft = 30) {
    return new Promise((resolve, reject) => {
        const check = () => {
        http.get(`http://localhost:${BACKEND_PORT}/health`, (res) => {
            if (res.statusCode === 200) {
            resolve();
            } else {
            retry();
            }
        }).on('error', retry);
    };

        const retry = () => {
            if (retriesLeft <= 0) {
                reject(new Error('El backend no respondió a tiempo.'));
                return;
            }
            retriesLeft--;
            setTimeout(check, 500);
            };

        check();
    });
}

function getUniquePath(targetPath) {
    if (!fs.existsSync(targetPath)) return targetPath;

    const dir = path.dirname(targetPath);
    const ext = path.extname(targetPath);
    const base = path.basename(targetPath, ext);

    let counter = 1;
    let candidate;
    do {
        candidate = path.join(dir, `${base} (${counter})${ext}`);
        counter++;
    } while (fs.existsSync(candidate));

    return candidate;
}

function getExportsDir() {
    const dir = path.join(app.getPath('documents'), 'Validación de Inventario', 'Exportaciones');
    fs.mkdirSync(dir, { recursive: true });
    return dir;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1100,
        minHeight: 700,
        show: false,
        icon: path.join(__dirname, 'resources', 'icon.ico'),
        webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        },
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    const frontendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'frontend', 'index.html')
        : path.join(__dirname, '..', 'Frontend', 'Validacion-Inventario-web', 'dist', 'index.html');

    mainWindow.loadFile(frontendPath);
    }

    function registerIpcHandlers() {
    const CREDENTIALS_PATH = path.join(app.getPath('userData'), 'connection.cred');

    ipcMain.handle('save-export-file', async (_event, { filename, data }) => {
    const exportsDir = getExportsDir();
    const targetPath = getUniquePath(path.join(exportsDir, filename));

    const buffer = typeof data === 'string' ? Buffer.from(data, 'utf-8') : Buffer.from(data);
    fs.writeFileSync(targetPath, buffer);

    return { success: true, path: targetPath };
    });

    // --- Credenciales cifradas ---
    ipcMain.handle('credentials-save', (_event, credentials) => {
        if (!safeStorage.isEncryptionAvailable()) {
        return { success: false, reason: 'unavailable' };
        }
        const encrypted = safeStorage.encryptString(JSON.stringify(credentials));
        fs.writeFileSync(CREDENTIALS_PATH, encrypted);
        return { success: true };
    });

    ipcMain.handle('credentials-load', () => {
        if (!fs.existsSync(CREDENTIALS_PATH) || !safeStorage.isEncryptionAvailable()) {
        return null;
        }
        try {
        const encrypted = fs.readFileSync(CREDENTIALS_PATH);
        const decrypted = safeStorage.decryptString(encrypted);
        return JSON.parse(decrypted);
        } catch {
        return null; // archivo corrupto o cifrado con otra cuenta de Windows
        }
    });

    ipcMain.handle('credentials-clear', () => {
        if (fs.existsSync(CREDENTIALS_PATH)) {
        fs.unlinkSync(CREDENTIALS_PATH);
        }
        return { success: true };
    });

    ipcMain.handle('open-exports-folder', () => {
        shell.openPath(getExportsDir());
    });
    }

    app.whenReady().then(async () => {
    registerIpcHandlers();
    startBackend();

    try {
        await waitForBackend();
        createWindow();
    } catch (err) {
        logStream.write(`Error al iniciar: ${err}\n`);
        app.quit();
    }
    });

    app.on('window-all-closed', () => {
        if (backendProcess) backendProcess.kill();
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('before-quit', () => {
        if (backendProcess) backendProcess.kill();
    });