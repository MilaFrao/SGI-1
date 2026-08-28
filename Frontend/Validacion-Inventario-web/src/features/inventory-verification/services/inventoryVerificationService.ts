// features/inventory-verification/services/inventoryVerificationService.ts
import type { UpdateVerificationRequest } from "../types/inventoryVerification";

import { API_BASE_URL } from "../../../config/apiConfig";

export async function updateVerification(request: UpdateVerificationRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/inventory-verifications`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("No fue posible guardar la verificación.");
    }
}