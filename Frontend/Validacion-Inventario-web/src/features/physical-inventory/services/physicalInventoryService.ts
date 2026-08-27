import type { PhysicalInventoryItem } from "../types/physicalInventory";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPhysicalInventory(): Promise<PhysicalInventoryItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/physical-inventory`);

    if (!response.ok) {
    throw new Error("No fue posible obtener la información del inventario.");
    }

    return response.json() as Promise<PhysicalInventoryItem[]>;
}