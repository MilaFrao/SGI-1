declare global {
    interface Window {
        electronAPI?: { apiBaseUrl: string };
    }
}

export const API_BASE_URL = window.electronAPI?.apiBaseUrl ?? import.meta.env.VITE_API_BASE_URL;