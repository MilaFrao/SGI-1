const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    apiBaseUrl: 'http://localhost:5066',
    isElectron: true,

    saveFile: (suggestedName, filters, data) =>
        ipcRenderer.invoke('save-export-file', { suggestedName, filters, data }),

    saveCredentials: (credentials) => ipcRenderer.invoke('credentials-save', credentials),
    loadCredentials: () => ipcRenderer.invoke('credentials-load'),
    clearCredentials: () => ipcRenderer.invoke('credentials-clear'),
});