// features/export/components/ExportMenu.tsx
import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, FileType } from "lucide-react";
import type { PhysicalInventoryItem } from "../../physical-inventory/types/physicalInventory";
import { exportToCsv } from "../services/exportToCsv";
import { exportToExcel } from "../services/exportToExcel";
import { exportToPdf } from "../services/exportToPdf";

    interface ExportMenuProps {
    data: PhysicalInventoryItem[];
    }

    export function ExportMenu({ data }: ExportMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleExport = async (fn: (data: PhysicalInventoryItem[]) => void) => {
        await fn(data);
        setIsOpen(false);
    };

    const isDisabled = data.length === 0;

    return (
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
                onClick={() => handleExport(exportToCsv)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <FileText className="w-3.5 h-3.5 text-gray-400" /> CSV
            </button>
            <button
                onClick={() => handleExport(exportToExcel)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400" /> Excel (.xlsx)
            </button>
            <button
                onClick={() => handleExport(exportToPdf)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <FileType className="w-3.5 h-3.5 text-gray-400" /> PDF
            </button>
            </div>
        )}
        </div>
    );
}