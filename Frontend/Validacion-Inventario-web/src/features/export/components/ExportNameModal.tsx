import { useState } from "react";
import { X } from "lucide-react";

interface ExportNameModalProps {
  defaultName: string;
  formatLabel: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export function ExportNameModal({ defaultName, formatLabel, onConfirm, onCancel }: ExportNameModalProps) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Guardar como ({formatLabel})</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <label className="text-xs font-medium text-gray-500">Nombre del archivo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && onConfirm(name)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-[11px] text-gray-400">
            Se guardará en Documentos → Validación de Inventario → Exportaciones
          </p>
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(name)}
            className="flex-1 py-2 text-xs font-medium text-white bg-[#18181b] rounded-md hover:bg-gray-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}