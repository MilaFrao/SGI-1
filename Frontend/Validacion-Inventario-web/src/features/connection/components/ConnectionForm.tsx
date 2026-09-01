// features/connection/components/ConnectionForm.tsx
import { useEffect, useState } from "react";
import { Database, Server, ShieldCheck, KeyRound, RefreshCw, HardDrive } from "lucide-react";
import { testConnection } from "../services/connectionService";
import { saveCredentials, loadCredentials, clearCredentials } from "../services/credentialsStorageService";
import { RecentConnectionTab } from "./RecentConnectionTab";
import type { StoredCredentials } from "../../../config/apiConfig";

interface ConnectionFormProps {
  onConnected: (server: string, database: string) => void;
}

export function ConnectionForm({ onConnected }: ConnectionFormProps) {
  const [server, setServer] = useState("localhost");
  const [database, setDatabase] = useState("GDC_PRUEBAS");
  const [dbUser, setDbUser] = useState("sa");
  const [dbPassword, setDbPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedCredentials, setSavedCredentials] = useState<StoredCredentials | null>(null);

  // Solo CONSULTA si hay algo guardado, no conecta con nada por su cuenta.
  useEffect(() => {
    loadCredentials().then(setSavedCredentials);
  }, []);

  const connectWith = async (credentials: StoredCredentials) => {
    setIsConnecting(true);
    setError(null);

    try {
      const result = await testConnection(credentials);
      if (result.success) {
        await saveCredentials(credentials);
        setSavedCredentials(credentials);
        onConnected(credentials.server, credentials.database);
      } else {
        setError(result.message);
      }
    } catch {
      setError("No fue posible comunicarse con el servidor.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    connectWith({ server, database, user: dbUser, password: dbPassword });
  };

  const handleUseSaved = () => {
    if (!savedCredentials) return;
    // Reflejamos los valores en el formulario también, por transparencia,
    // pero la conexión la dispara el usuario, nunca sola al cargar la pantalla.
    setServer(savedCredentials.server);
    setDatabase(savedCredentials.database);
    setDbUser(savedCredentials.user);
    setDbPassword(savedCredentials.password);
    connectWith(savedCredentials);
  };

  const handleForgetSaved = async () => {
    await clearCredentials();
    setSavedCredentials(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-4 selection:bg-blue-100">
      {savedCredentials && (
        <RecentConnectionTab
          credentials={savedCredentials}
          onUse={handleUseSaved}
          onForget={handleForgetSaved}
          isConnecting={isConnecting}
        />
      )}

      <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <div className="bg-[#18181b] px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-gray-400" />
            <h1 className="text-white font-medium tracking-tight text-sm uppercase">
              Validación de Inventario
            </h1>
          </div>
        </div>

        <form onSubmit={handleConnect} className="p-6 space-y-5">
          <div className="bg-blue-50 border border-blue-100 rounded-md px-3 py-2.5">
            <p className="text-xs font-medium text-blue-900">Conexión al servidor de base de datos</p>
            <p className="text-[11px] text-blue-700 mt-0.5">
              Estas credenciales corresponden a tu servidor SQL Server, no a una cuenta personal de la aplicación.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Server className="w-3.5 h-3.5" /> Servidor
              </label>
              <input
                type="text"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-3.5 h-3.5" /> Base de datos
              </label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="pt-1 border-t border-gray-100">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider pt-3 pb-1">
                Credenciales de acceso a la BD
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Usuario de SQL Server
              </label>
              <input
                type="text"
                value={dbUser}
                onChange={(e) => setDbUser(e.target.value)}
                placeholder="ej. sa"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5" /> Contraseña de SQL Server
              </label>
              <input
                type="password"
                value={dbPassword}
                onChange={(e) => setDbPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isConnecting}
              className="w-full bg-[#18181b] hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                "Probar conexión"
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 mt-4">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            Desconectado
          </div>
        </form>
      </div>
    </div>
  );
}