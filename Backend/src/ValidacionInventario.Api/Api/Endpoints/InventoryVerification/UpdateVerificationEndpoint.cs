using Microsoft.AspNetCore.Routing;
using ValidacionInventario.Application.InventoryVerification.Contracts;
using ValidacionInventario.Application.InventoryVerification.CU;

namespace ValidacionInventario.Api.Endpoints.InventoryVerification;

public static class UpdateVerificationEndpoint
{
    public static IEndpointRouteBuilder MapUpdateVerification(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPut("/api/inventory-verifications", async (
            UpdateVerificationRequest request,
            UpdateVerificationUseCase useCase,
            CancellationToken cancellationToken) =>
        {
            await useCase.ExecuteAsync(request, cancellationToken);
            return Results.NoContent();
        });

        return endpoints;
    }
}