using Microsoft.Extensions.DependencyInjection;
using ValidacionInventario.Application.Connections.CU;

namespace ValidacionInventario.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<TestConnectionUseCase>();

        return services;
    }
}