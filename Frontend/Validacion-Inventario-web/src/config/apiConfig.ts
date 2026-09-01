export interface StoredCredentials {
    server: string;
    database: string;
    user: string;
    password: string;
}

declare global {
    interface Window {
        electronAPI?: {
        apiBaseUrl: string;
        isElectron?: boolean;
        saveFile?: (
            filename: string,
            data: Uint8Array | string
        ) => Promise<{ success: boolean; path?: string }>;
            openExportsFolder?: () => Promise<void>;
            saveCredentials?: (credentials: StoredCredentials) => Promise<{ success: boolean }>;
            loadCredentials?: () => Promise<StoredCredentials | null>;
            clearCredentials?: () => Promise<{ success: boolean }>;
        };
    }
}

export const API_BASE_URL = window.electronAPI?.apiBaseUrl ?? import.meta.env.VITE_API_BASE_URL;