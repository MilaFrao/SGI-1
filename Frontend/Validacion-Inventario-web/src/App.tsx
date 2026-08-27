import { useState } from "react";
import { ConnectionForm } from "./features/connection/components/ConnectionForm";
import { InventoryScreen } from "./features/physical-inventory/components/InventoryScreen";

function App() {
  const [connectionInfo, setConnectionInfo] = useState<{ server: string; database: string } | null>(null);

  if (!connectionInfo) {
    return <ConnectionForm onConnected={(server, database) => setConnectionInfo({ server, database })} />;
  }

  return (
    <InventoryScreen
      server={connectionInfo.server}
      database={connectionInfo.database}
      onDisconnect={() => setConnectionInfo(null)}
    />
  );
}

export default App;