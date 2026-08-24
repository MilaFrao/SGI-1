using Microsoft.Extensions.DependencyInjection;
using ValidacionInventario.Application.Connections.CU;
using ValidacionInventario.Application.PhysicalInventory.CU;

namespace ValidacionInventario.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<TestConnectionUseCase>();
        services.AddScoped<GetPhysicalInventoryUseCase>();

        return services;
    }
}