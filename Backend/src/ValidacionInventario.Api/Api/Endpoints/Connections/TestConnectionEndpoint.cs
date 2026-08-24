using Microsoft.AspNetCore.Routing;
using ValidacionInventario.Application.Connections.Contracts;
using ValidacionInventario.Application.Connections.CU;

namespace ValidacionInventario.Api.Endpoints.Connections;

public static class TestConnectionEndpoint
{
    public static IEndpointRouteBuilder MapTestConnection(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/connections/test", async (
            TestConnectionRequest request,
            TestConnectionUseCase useCase,
            CancellationToken cancellationToken) =>
        {
            var result = await useCase.ExecuteAsync(request, cancellationToken);
            return Results.Ok(result);
        });

        return endpoints;
    }
}