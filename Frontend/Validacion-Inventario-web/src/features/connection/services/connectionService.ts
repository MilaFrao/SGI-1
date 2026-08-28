import type { TestConnectionRequest,TestConnectionResponse } from "../types/connection";

import { API_BASE_URL } from "../../../config/apiConfig";

export async function testConnection(
    request: TestConnectionRequest,
): Promise<TestConnectionResponse> {
    const response = await fetch(
    `${API_BASE_URL}/api/connections/test`,
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    },
    );

    if (!response.ok) {
    throw new Error("No fue posible procesar la solicitud.");
    }

    return response.json() as Promise<TestConnectionResponse>;
}