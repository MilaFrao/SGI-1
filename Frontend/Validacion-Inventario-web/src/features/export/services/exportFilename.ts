// features/export/services/exportFilename.ts
function sanitizeFilename(name: string): string {
    return name
        .trim()
        .replace(/[\\/:*?"<>|]/g, "-") // caracteres inválidos en Windows
        .slice(0, 100);
}

export function buildDefaultBaseName(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `Inventario Físico ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function buildFilenameWithExtension(customName: string, extension: string): string {
    const base = sanitizeFilename(customName) || buildDefaultBaseName();
    return `${base}.${extension}`;
}