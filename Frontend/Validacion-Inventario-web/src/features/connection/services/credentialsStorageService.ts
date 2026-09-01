import type { StoredCredentials } from "../../../config/apiConfig";

export async function saveCredentials(credentials: StoredCredentials): Promise<void> {
    await window.electronAPI?.saveCredentials?.(credentials);
}

export async function loadCredentials(): Promise<StoredCredentials | null> {
    const result = await window.electronAPI?.loadCredentials?.();
    return result ?? null;
}

export async function clearCredentials(): Promise<void> {
    await window.electronAPI?.clearCredentials?.();
}