import type { TestConnectionRequest,TestConnectionResponse } from "./connection";

const API_BASE_URL = import.meta.env.local.VITE_API_BASE_URL;

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