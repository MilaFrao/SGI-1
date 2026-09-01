// features/export/components/ExportMenu.tsx
import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, FileType, FolderOpen, CheckCircle2 } from "lucide-react";
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { exportToCsv } from "../services/exportToCsv";
import { exportToExcel } from "../services/exportToExcel";
import { exportToPdf } from "../services/exportToPdf";
import { buildDefaultBaseName } from "../services/exportFilename";
import { ExportNameModal } from "./ExportNameModal";

interface ExportMenuProps {
  data: PhysicalInventoryItem[];
}

type Format = "csv" | "xlsx" | "pdf";

const FORMAT_CONFIG: Record<Format, { label: string; fn: (data: PhysicalInventoryItem[], name: string) => Promise<void> }> = {
  csv: { label: "CSV", fn: exportToCsv },
  xlsx: { label: "Excel (.xlsx)", fn: exportToExcel },
  pdf: { label: "PDF", fn: exportToPdf },
};

export function ExportMenu({ data }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFormat, setPendingFormat] = useState<Format | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 6000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleConfirmName = async (name: string) => {
    if (!pendingFormat) return;
    const { fn, label } = FORMAT_CONFIG[pendingFormat];

    try {
      await fn(data, name);
      setSuccessMessage(`${label} guardado correctamente.`);
    } catch {
      setSuccessMessage(null);
      alert("No fue posible guardar el archivo.");
    } finally {
      setPendingFormat(null);
    }
  };

  const isDisabled = data.length === 0;

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isDisabled}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-xs font-medium text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5" />
          Exportar
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
            <button
              onClick={() => { setPendingFormat("csv"); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-gray-400" /> CSV
            </button>
            <button
              onClick={() => { setPendingFormat("xlsx"); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400" /> Excel (.xlsx)
            </button>
            <button
              onClick={() => { setPendingFormat("pdf"); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileType className="w-3.5 h-3.5 text-gray-400" /> PDF
            </button>
          </div>
        )}
      </div>

      {pendingFormat && (
        <ExportNameModal
          defaultName={buildDefaultBaseName()}
          formatLabel={FORMAT_CONFIG[pendingFormat].label}
          onConfirm={handleConfirmName}
          onCancel={() => setPendingFormat(null)}
        />
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-md px-4 py-3 flex items-center gap-3 z-50">
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
          <span className="text-xs text-gray-700">{successMessage}</span>
          <button
            onClick={() => window.electronAPI?.openExportsFolder?.()}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <FolderOpen className="w-3.5 h-3.5" /> Abrir carpeta
          </button>
        </div>
      )}
    </>
  );
}