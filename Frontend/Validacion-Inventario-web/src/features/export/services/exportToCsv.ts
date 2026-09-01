// features/export/services/exportToCsv.ts
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { buildFilenameWithExtension } from "./exportFilename";
import { saveExportFile } from "./saveExportFile";

const HEADERS = [
  "Nº de página", "Código de barra", "Referencia", "Toma física 1", "Usuario 1",
  "Toma física 2", "Usuario 2", "Diferencia entre tomas", "Estado",
  "Existencia actual", "Validación 2", "Diferencia", "Coincide con el sistema",
  "Estado de verificación",
];

function escapeCsvValue(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toRow(item: PhysicalInventoryItem): unknown[] {
  return [
    item.numeroPagina, item.codigoBarra, item.referencia, item.toma1, item.usuario1,
    item.toma2, item.usuario2, item.validacion1, item.estado, item.existencia,
    item.validacion2, item.validacion3, item.coincidencia === "SI" ? "Sí" : "No",
    item.estadoVerificacion,
  ];
}

export async function exportToCsv(data: PhysicalInventoryItem[], customName: string): Promise<void> {
  const lines = [HEADERS, ...data.map(toRow)].map((row) => row.map(escapeCsvValue).join(","));
  const csvContent = "\uFEFF" + lines.join("\n");

  await saveExportFile(
    buildFilenameWithExtension(customName, "csv"),
    csvContent,
    "text/csv;charset=utf-8;"
  );
}