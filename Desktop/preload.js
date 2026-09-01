const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    apiBaseUrl: 'http://localhost:5066',
    isElectron: true,

    saveFile: (filename, data) =>
        ipcRenderer.invoke('save-export-file', { filename, data }),

    openExportsFolder: () => ipcRenderer.invoke('open-exports-folder'),

    saveCredentials: (credentials) => ipcRenderer.invoke('credentials-save', credentials),
    loadCredentials: () => ipcRenderer.invoke('credentials-load'),
    clearCredentials: () => ipcRenderer.invoke('credentials-clear'),
});