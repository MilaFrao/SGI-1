using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ValidacionInventario.Application.InventoryVerification.Contracts;
using ValidacionInventario.Application.InventoryVerification.Interfaces;
using ValidacionInventario.Infrastructure.Persistence.Contexts;

namespace ValidacionInventario.Infrastructure.Persistence.InventoryVerification;

public sealed class VerificationRepository : IVerificationRepository
{
    private readonly string _filePath;
    private readonly InventoryDbContext _inventoryContext;
    private static readonly SemaphoreSlim FileLock = new(1, 1);

    public VerificationRepository(InventoryDbContext inventoryContext, IConfiguration configuration)
    {
        _inventoryContext = inventoryContext;
        _filePath = configuration["VerificationsFilePath"]
            ?? Path.Combine(AppContext.BaseDirectory, "App_Data", "verificaciones.json");
    }

    public async Task UpsertAsync(UpdateVerificationRequest request, CancellationToken cancellationToken = default)
    {
        // Snapshot server-side real, igual que en la versión SQL — nunca confiamos en lo que mande el cliente
        var current = await _inventoryContext.PhysicalInventoryResults
            .FromSqlRaw(PhysicalInventory.PhysicalInventoryRepository.RawQueryText)
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.NumeroPagina == request.NumeroPagina && r.CodigoBarra == request.CodigoBarra, cancellationToken)
            ?? throw new InvalidOperationException("Registro de inventario no encontrado.");

        await FileLock.WaitAsync(cancellationToken);
        try
        {
            var records = await ReadAllAsync(cancellationToken);

            var existing = records.FirstOrDefault(r =>
                r.NumeroPagina == request.NumeroPagina && r.CodigoBarra == request.CodigoBarra);

            if (existing is null)
            {
                existing = new VerificacionRecord
                {
                    NumeroPagina = request.NumeroPagina,
                    CodigoBarra = request.CodigoBarra
                };
                records.Add(existing);
            }

            existing.Referencia = current.Referencia;
            existing.Verificado = request.Verificado;
            existing.Supervisor = request.Supervisor;
            existing.FechaVerificacion = DateTime.UtcNow;
            existing.Toma1Snapshot = current.Toma1;
            existing.Toma2Snapshot = current.Toma2;
            existing.ExistenciaSnapshot = current.Existencia;
            existing.CoincidenciaSnapshot = current.Coincidencia;

            await WriteAllAsync(records, cancellationToken);
        }
        finally
        {
            FileLock.Release();
        }
    }

    public async Task<IReadOnlyList<VerificacionRecord>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        await FileLock.WaitAsync(cancellationToken);
        try
        {
            return await ReadAllAsync(cancellationToken);
        }
        finally
        {
            FileLock.Release();
        }
    }

    private async Task<List<VerificacionRecord>> ReadAllAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_filePath))
            return new List<VerificacionRecord>();

        await using var stream = File.OpenRead(_filePath);
        var records = await JsonSerializer.DeserializeAsync<List<VerificacionRecord>>(stream, cancellationToken: cancellationToken);
        return records ?? new List<VerificacionRecord>();
    }

    private async Task WriteAllAsync(List<VerificacionRecord> records, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_filePath)!;
        Directory.CreateDirectory(directory);

        await using var stream = File.Create(_filePath);
        await JsonSerializer.SerializeAsync(stream, records, new JsonSerializerOptions { WriteIndented = true }, cancellationToken);
    }
}