export interface StoredCredentials {
    server: string;
    database: string;
    user: string;
    password: string;
}

interface SaveFileFilter {
    name: string;
    extensions: string[];
}

declare global {
    interface Window {
        electronAPI?: {
        apiBaseUrl: string;
        isElectron?: boolean;
        saveFile?: (
            suggestedName: string,
            filters: SaveFileFilter[],
            data: Uint8Array | string
        ) => Promise<{ success: boolean; canceled?: boolean; path?: string }>;
        saveCredentials?: (credentials: StoredCredentials) => Promise<{ success: boolean }>;
        loadCredentials?: () => Promise<StoredCredentials | null>;
        clearCredentials?: () => Promise<{ success: boolean }>;
        };
    }
}

export const API_BASE_URL = window.electronAPI?.apiBaseUrl ?? import.meta.env.VITE_API_BASE_URL;