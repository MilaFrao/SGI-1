import { useState, useCallback } from "react";
import { getPhysicalInventory } from "../services/physicalInventoryService";
import type { PhysicalInventoryItem } from "../types/physicalInventory";

export function usePhysicalInventory() {
    const [data, setData] = useState<PhysicalInventoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
        try {
            const result = await getPhysicalInventory();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, refresh };
}