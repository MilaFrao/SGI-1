export async function saveExportFile(
    filename: string,
    data: Uint8Array | string,
    mimeType: string
): Promise<void> {
    if (window.electronAPI?.saveFile) {
        const result = await window.electronAPI.saveFile(filename, data);
        if (!result.success) {
        throw new Error("No fue posible guardar el archivo.");
        }
        return;
    }

  // Fallback para npm run dev sin Electron: descarga directa con el nombre elegido
    const blob = new Blob([data] as unknown as BlobPart[], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}