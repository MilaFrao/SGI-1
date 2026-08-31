// features/export/services/exportToExcel.ts
import * as XLSX from "xlsx";
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { buildExportFilename } from "./exportFilename";
import { saveExportFile } from "./saveExportFile";

export async function exportToExcel(data: PhysicalInventoryItem[]): Promise<void> {
    const rows = data.map((item) => ({
        "Nº de página": item.numeroPagina,
        "Código de barra": item.codigoBarra,
        "Referencia": item.referencia,
        "Toma física 1": item.toma1,
        "Usuario 1": item.usuario1,
        "Toma física 2": item.toma2,
        "Usuario 2": item.usuario2,
        "Diferencia entre tomas": item.validacion1,
        "Estado": item.estado,
        "Existencia actual": item.existencia,
        "Validación 2": item.validacion2,
        "Diferencia": item.validacion3,
        "Coincide con el sistema": item.coincidencia === "SI" ? "Sí" : "No",
        "Estado de verificación": item.estadoVerificacion,
        "Supervisor": item.supervisor ?? "",
        "Fecha de verificación": item.fechaVerificacion ?? "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = Object.keys(rows[0] ?? {}).map((key) => ({ wch: Math.max(key.length, 14) }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario Físico");

    const bytes = XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as Uint8Array;

    await saveExportFile(
        buildExportFilename("xlsx"),
        bytes,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        { name: "Excel", extensions: ["xlsx"] }
    );
}