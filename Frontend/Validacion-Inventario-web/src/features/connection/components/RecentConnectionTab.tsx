// features/connection/components/RecentConnectionTab.tsx
import { useState } from "react";
import { History, Server, Database, X, Trash2 } from "lucide-react";
import type { StoredCredentials } from "../../../config/apiConfig";

    interface RecentConnectionTabProps {
    credentials: StoredCredentials;
    onUse: () => void;
    onForget: () => void;
    isConnecting: boolean;
    }

    export function RecentConnectionTab({ credentials, onUse, onForget, isConnecting }: RecentConnectionTabProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-4 right-4 z-50">
        {!isOpen && (
            <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-xs font-medium text-gray-600 hover:border-gray-300 hover:shadow transition-all"
            >
            <History className="w-3.5 h-3.5" />
            Conexión reciente
            </button>
        )}

        {isOpen && (
            <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Última conexión
                </span>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="p-4 space-y-3">
                <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                    <Server className="w-3 h-3 text-gray-400" />
                    <span className="font-mono">{credentials.server}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Database className="w-3 h-3 text-gray-400" />
                    <span className="font-mono">{credentials.database}</span>
                </div>
                <div className="text-gray-400">Usuario: {credentials.user}</div>
                </div>

                <button
                onClick={onUse}
                disabled={isConnecting}
                className="w-full bg-[#18181b] hover:bg-gray-800 text-white text-xs font-medium py-2 rounded-md transition-colors disabled:opacity-60"
                >
                {isConnecting ? "Conectando..." : "Usar esta conexión"}
                </button>

                <button
                onClick={onForget}
                className="w-full flex items-center justify-center gap-1.5 text-[11px] text-gray-400 hover:text-red-600 transition-colors pt-1"
                >
                <Trash2 className="w-3 h-3" />
                Olvidar
                </button>
            </div>
            </div>
        )}
        </div>
    );
}