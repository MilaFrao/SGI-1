// features/physical-inventory/components/InventoryScreen.tsx
import { useEffect, useState } from "react";
import { HardDrive, RefreshCw } from "lucide-react";
import { usePhysicalInventory } from "../hooks/usePhysicalInventory";
import { PhysicalInventoryTable } from "./PhysicalInventoryTable";
import { updateVerification } from "../../inventory-verification/services/inventoryVerificationService";
import type { PhysicalInventoryItem } from "../types/physicalInventory";
import { ExportMenu } from "../../export/components/ExportMenu";

interface InventoryScreenProps {
  server: string;
  database: string;
  onDisconnect: () => void;
}

export function InventoryScreen({ server, database, onDisconnect }: InventoryScreenProps) {
  const { data, loading, error, refresh } = usePhysicalInventory();
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleToggleVerificado = async (item: PhysicalInventoryItem, verificado: boolean) => {
    setVerificationError(null);
    const key = `${item.numeroPagina}-${item.codigoBarra}`;
    setSavingKey(key);

    try {
      await updateVerification({
        numeroPagina: item.numeroPagina,
        codigoBarra: item.codigoBarra,
        verificado,
      });
      await refresh();
    } catch {
      setVerificationError("No fue posible guardar la verificación. Intenta de nuevo.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col font-sans selection:bg-blue-100">
      <header className="bg-[#18181b] text-white px-6 py-3 border-b border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-gray-400" />
          <h1 className="font-medium tracking-tight text-sm uppercase">Validación de Inventario</h1>
          <div className="h-4 w-[1px] bg-gray-700 mx-2"></div>
          <span className="text-xs font-mono text-gray-400">
            {server} / {database}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            <span className="text-gray-300">Conectado</span>
          </div>
          <button onClick={onDisconnect} className="text-gray-400 hover:text-white transition-colors">
            Desconectar
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-end shrink-0 gap-4">
        <div className="flex items-center gap-2">
          <ExportMenu data={data} />
          <button
            onClick={() => refresh()}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-xs font-medium text-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {(error || verificationError) && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-2 text-xs text-red-700">
          {error ?? verificationError}
        </div>
      )}

      <main className="flex-1 p-6 overflow-hidden flex flex-col">
        <PhysicalInventoryTable
          data={data}
          onToggleVerificado={handleToggleVerificado}
          savingKey={savingKey}
        />
      </main>
    </div>
  );
}