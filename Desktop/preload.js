const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    apiBaseUrl: 'http://localhost:5066',
});