// features/export/services/exportFilename.ts
export function buildExportFilename(extension: string): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    return `inventario_fisico_${timestamp}.${extension}`;
}