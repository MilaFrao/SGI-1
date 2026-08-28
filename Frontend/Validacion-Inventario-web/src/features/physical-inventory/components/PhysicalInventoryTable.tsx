// features/physical-inventory/components/PhysicalInventoryTable.tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { PhysicalInventoryItem } from "../types/physicalInventory";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PhysicalInventoryTableProps {
  data: PhysicalInventoryItem[];
  onToggleVerificado: (item: PhysicalInventoryItem, verificado: boolean) => void;
  savingKey: string | null; // `${numeroPagina}-${codigoBarra}` de la fila en proceso de guardado
}

function rowShade(estadoVerificacion: PhysicalInventoryItem["estadoVerificacion"]) {
  switch (estadoVerificacion) {
    case "Verificado":
      return "bg-green-50/60 hover:bg-green-50";
    case "Modificado":
      return "bg-amber-50/60 hover:bg-amber-50";
    default:
      return "hover:bg-blue-50/50";
  }
}

export function PhysicalInventoryTable({ data, onToggleVerificado, savingKey }: PhysicalInventoryTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 sticky top-0 z-20 ring-1 ring-gray-200 shadow-sm">
            <tr>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-center text-xs uppercase tracking-wider whitespace-normal min-w-[80px] leading-tight sticky left-0 z-30 bg-gray-50">Nº de<br/>página</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-xs uppercase tracking-wider whitespace-nowrap sticky left-[80px] z-30 bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.06)]">Código de barra</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-xs uppercase tracking-wider whitespace-nowrap">Referencia</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[90px] leading-tight">Toma<br/>física 1</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-center text-xs uppercase tracking-wider whitespace-normal min-w-[90px] leading-tight">Usuario 1</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[90px] leading-tight">Toma<br/>física 2</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-center text-xs uppercase tracking-wider whitespace-normal min-w-[90px] leading-tight">Usuario 2</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[120px] leading-tight">Diferencia<br/>entre tomas</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-xs uppercase tracking-wider whitespace-nowrap">Estado</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[100px] leading-tight">Existencia<br/>actual</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[100px] leading-tight">Validación 2</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-right text-xs uppercase tracking-wider whitespace-normal min-w-[100px] leading-tight">Diferencia</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 border-r border-gray-200 text-center text-xs uppercase tracking-wider whitespace-normal min-w-[120px] leading-tight">¿Coincide con<br/>el sistema?</th>
              <th className="px-4 py-2.5 font-semibold text-gray-600 w-28 text-center text-xs uppercase tracking-wider whitespace-normal leading-tight">Verificado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-mono text-[13px] whitespace-nowrap">
            {data.map((row) => {
              const rowKey = `${row.numeroPagina}-${row.codigoBarra}`;
              const isSaving = savingKey === rowKey;

              return (
                <tr key={rowKey} className={cn("transition-colors group", rowShade(row.estadoVerificacion))}>
                  <td className="px-4 py-2 border-r border-gray-100 text-center text-gray-400 sticky left-0 z-10 bg-white group-hover:bg-blue-50/50">{row.numeroPagina}</td>
                  <td className="px-4 py-2 border-r border-gray-100 font-medium text-gray-900 sticky left-[80px] z-10 bg-white group-hover:bg-blue-50/50 shadow-[2px_0_4px_rgba(0,0,0,0.06)]">{row.codigoBarra}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-gray-600">{row.referencia}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right">{row.toma1}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-center text-gray-500 font-sans text-xs">{row.usuario1}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right">{row.toma2}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-center text-gray-500 font-sans text-xs">{row.usuario2}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-xs font-semibold",
                      row.validacion1 === 0 ? "text-green-600 bg-green-50" :
                      Math.abs(row.validacion1) > 10 ? "text-red-600 bg-red-50" : "text-amber-600 bg-amber-50"
                    )}>
                      {row.validacion1 > 0 ? `+${row.validacion1}` : row.validacion1}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100">
                    <div className="flex items-center gap-1.5">
                      {row.estado === "Correcto" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span className={cn(
                        "text-xs font-sans font-medium",
                        row.estado === "Correcto" ? "text-green-700" : "text-amber-700"
                      )}>
                        {row.estado}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right font-semibold text-gray-700">{row.existencia}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right text-gray-600">{row.validacion2}</td>
                  <td className="px-4 py-2 border-r border-gray-100 text-right">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-xs font-semibold",
                      row.validacion3 === 0 ? "text-gray-600 bg-gray-100" :
                      row.validacion3 < 0 ? "text-red-600 bg-red-50" : "text-amber-600 bg-amber-50"
                    )}>
                      {row.validacion3 > 0 ? `+${row.validacion3}` : row.validacion3}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-sans font-medium",
                      row.coincidencia === "SI"
                        ? "text-green-700 bg-green-100/50 border border-green-200"
                        : "text-red-700 bg-red-100/50 border border-red-200"
                    )}>
                      {row.coincidencia === "SI" ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50"
                      checked={row.estadoVerificacion !== "Pendiente"}
                      disabled={isSaving}
                      onChange={(e) => onToggleVerificado(row, e.target.checked)}
                    />
                    {row.estadoVerificacion === "Modificado" && (
                      <div className="text-[10px] text-amber-600 font-sans mt-0.5">Modificado</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 flex justify-between items-center shrink-0">
        <span>Total registros: {data.length}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Correctos: {data.filter((d) => d.estado === "Correcto").length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            Alertas: {data.filter((d) => d.estado !== "Correcto").length}
          </span>
        </div>
      </div>
    </div>
  );
}