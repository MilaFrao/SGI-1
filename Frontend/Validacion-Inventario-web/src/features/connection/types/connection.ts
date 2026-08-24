export interface TestConnectionRequest
{
    server: string;
    database: string;
    user: string;
    password: string;
}

export interface TestConnectionResponse
{
    success: boolean;
    message: string;
}