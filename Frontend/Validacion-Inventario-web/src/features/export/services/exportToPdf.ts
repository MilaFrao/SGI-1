// features/export/services/exportToPdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { buildExportFilename } from "./exportFilename";
import { saveExportFile } from "./saveExportFile";

const HEADERS = [
    "Nº pág.", "Cód. barra", "Referencia", "Toma 1", "Usu. 1", "Toma 2", "Usu. 2",
    "Dif. tomas", "Estado", "Existencia", "Valid. 2", "Dif.", "Coincide", "Verificación",
];

export async function exportToPdf(data: PhysicalInventoryItem[]): Promise<void> {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(14);
    doc.text("Validación de Inventario Físico", 14, 15);
    doc.setFontSize(9);
    doc.text(`Generado: ${new Date().toLocaleString("es-ES")} — Total registros: ${data.length}`, 14, 21);

    const rows = data.map((item) => [
        item.numeroPagina, item.codigoBarra, item.referencia ?? "", item.toma1, item.usuario1,
        item.toma2, item.usuario2 ?? "", item.validacion1, item.estado, item.existencia,
        item.validacion2, item.validacion3, item.coincidencia === "SI" ? "Sí" : "No",
        item.estadoVerificacion,
    ]);

    autoTable(doc, {
        head: [HEADERS],
        body: rows,
        startY: 26,
        styles: { fontSize: 7, cellPadding: 1.5 },
        headStyles: { fillColor: [24, 24, 27] },
    });

    const bytes = new Uint8Array(doc.output("arraybuffer") as ArrayBuffer);

    await saveExportFile(buildExportFilename("pdf"), bytes, "application/pdf", { name: "PDF", extensions: ["pdf"] });
}