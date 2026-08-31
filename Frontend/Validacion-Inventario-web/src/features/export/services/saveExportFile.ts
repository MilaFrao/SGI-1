interface SaveFileFilter {
    name: string;
    extensions: string[];
}

export async function saveExportFile(
    filename: string,
    data: Uint8Array | string,
    mimeType: string,
    filter: SaveFileFilter
): Promise<void> {
    if (window.electronAPI?.saveFile) {
        const result = await window.electronAPI.saveFile(filename, [filter], data);
        if (!result.success && !result.canceled) {
            throw new Error("No fue posible guardar el archivo.");
        }
        return; // si el usuario canceló el diálogo, no es un error
    }

  // Fallback para cuando se corre en el navegador (npm run dev sin Electron)
    const blobData = data instanceof Uint8Array ? new Uint8Array(data) : data;
    const blob = new Blob([blobData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}