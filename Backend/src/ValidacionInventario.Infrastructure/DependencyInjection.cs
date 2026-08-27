// Infrastructure/DependencyInjection.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ValidacionInventario.Infrastructure.Persistence.Contexts;
using ValidacionInventario.Application.Connections.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.Connections; 
using ValidacionInventario.Application.PhysicalInventory.Interfaces; // IPhysicalInventoryRepository
using ValidacionInventario.Infrastructure.Persistence.PhysicalInventory; // PhysicalInventoryRepository
using ValidacionInventario.Application.InventoryVerification.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.InventoryVerification;

namespace ValidacionInventario.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddScoped<IConnectionTester, SqlServerConnectionTester>();
        services.AddDbContext<InventoryDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("InventoryDatabase")));
        services.AddScoped<IPhysicalInventoryRepository, PhysicalInventoryRepository>();
        services.AddScoped<VerificationRepository>();
        services.AddScoped<IVerificationRepository>(services =>
            services.GetRequiredService<VerificationRepository>());

        return services;
    }
}