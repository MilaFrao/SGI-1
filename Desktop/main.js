const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const BACKEND_PORT = 5066;
let backendProcess = null;
let mainWindow = null;

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

    backendProcess.stdout.on('data', (data) => console.log(`[backend] ${data}`));
    backendProcess.stderr.on('data', (data) => console.error(`[backend] ${data}`));

    backendProcess.on('exit', (code) => {
    console.log(`Backend cerrado con código ${code}`);
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

function createWindow() {
    mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
    },
    });

    const frontendPath = app.isPackaged
    ? path.join(process.resourcesPath, 'frontend', 'index.html')
    : path.join(__dirname, '..', 'Frontend', 'Validacion-Inventario-web', 'dist', 'index.html');

    mainWindow.loadFile(frontendPath);
}

app.whenReady().then(async () => {
    startBackend();

    try {
    await waitForBackend();
    createWindow();
    } catch (err) {
    console.error(err);
    app.quit();
    }
});

app.on('window-all-closed', () => {
    if (backendProcess) {
    backendProcess.kill();
    }
    if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('before-quit', () => {
    if (backendProcess) {
    backendProcess.kill();
    }
});