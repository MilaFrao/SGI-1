using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ValidacionInventario.Infrastructure.Persistence.Contexts;
using ValidacionInventario.Application.Connections.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.Connections;
using ValidacionInventario.Application.PhysicalInventory.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.PhysicalInventory;
using ValidacionInventario.Application.InventoryVerification.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.InventoryVerification;

namespace ValidacionInventario.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, IConfiguration configuration)
    {
        // Singleton: debe sobrevivir entre requests, ya que guarda el connection string activo
        services.AddSingleton<IConnectionStringProvider, ConnectionStringProvider>();

        services.AddScoped<IConnectionTester, SqlServerConnectionTester>();

        services.AddDbContext<InventoryDbContext>((serviceProvider, options) =>
        {
            var connectionStringProvider = serviceProvider.GetRequiredService<IConnectionStringProvider>();
            var connectionString = connectionStringProvider.CurrentConnectionString
                ?? configuration.GetConnectionString("InventoryDatabase"); // fallback solo para dev local

            if (connectionString is not null)
            {
                options.UseSqlServer(connectionString);
            }
        });

        services.AddScoped<IPhysicalInventoryRepository, PhysicalInventoryRepository>();
        services.AddScoped<VerificationRepository>();
        services.AddScoped<IVerificationRepository>(sp =>
            sp.GetRequiredService<VerificationRepository>());

        return services;
    }
}