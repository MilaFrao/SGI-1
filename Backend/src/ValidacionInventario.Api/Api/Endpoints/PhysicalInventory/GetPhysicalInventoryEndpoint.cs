using Microsoft.AspNetCore.Routing;
using ValidacionInventario.Application.PhysicalInventory.CU;

namespace ValidacionInventario.Api.Endpoints.PhysicalInventory;

public static class GetPhysicalInventoryEndpoint
{
    public static IEndpointRouteBuilder MapGetPhysicalInventory(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/physical-inventory", async (
            GetPhysicalInventoryUseCase useCase,
            CancellationToken cancellationToken) =>
        {
            var result = await useCase.ExecuteAsync(cancellationToken);
            return Results.Ok(result);
        });

        return endpoints;
    }
}