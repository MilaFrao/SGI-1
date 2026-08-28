// features/export/services/exportToExcel.ts
import * as XLSX from "xlsx";
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { buildExportFilename } from "./exportFilename";

export function exportToExcel(data: PhysicalInventoryItem[]): void {
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

  // Ancho de columnas aproximado, para que no quede todo apretado al abrir
    worksheet["!cols"] = Object.keys(rows[0] ?? {}).map((key) => ({
        wch: Math.max(key.length, 14),
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario Físico");

    XLSX.writeFile(workbook, buildExportFilename("xlsx"));
}