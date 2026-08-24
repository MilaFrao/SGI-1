using Microsoft.EntityFrameworkCore;
using ValidacionInventario.Application.PhysicalInventory.Interfaces;
using ValidacionInventario.Domain.PhysicalInventory;
using ValidacionInventario.Infrastructure.Persistence.Contexts;

namespace ValidacionInventario.Infrastructure.Persistence.PhysicalInventory;

public sealed class PhysicalInventoryRepository : IPhysicalInventoryRepository
{
    private const string Query = """
        WITH CalculosBase AS (
            SELECT
                m1.NumeroPagina,
                m1.CodigoBarra,
                i.Referencia,
                m1.Cantidad AS toma_1,
                t1.Usuario AS usuario_1,
                ISNULL(m2.Cantidad, 0) AS toma_2,
                t2.Usuario AS usuario_2,
                (m1.Cantidad - ISNULL(m2.Cantidad, 0)) AS validacion_1,
                CASE
                    WHEN (m1.Cantidad - ISNULL(m2.Cantidad, 0)) = 0 THEN 'Correcto'
                    ELSE 'Alerta, verificar'
                END AS estado,
                ISNULL(i.Existencia, 0) AS Existencia,
                CASE
                    WHEN (ISNULL(m2.Cantidad, 0) - m1.Cantidad) = 0
                    THEN (ISNULL(i.Existencia, 0) - m1.Cantidad)
                    ELSE ((ISNULL(m2.Cantidad, 0) - m1.Cantidad) - ISNULL(i.Existencia, 0))
                END AS v2_calculada
            FROM dbo.MOVTOMAFISICA1 AS m1
            INNER JOIN dbo.TOMAFISICA1 AS t1 ON m1.NumeroPagina = t1.NumeroPagina
            LEFT JOIN dbo.MOVTOMAFISICA2 AS m2 ON m1.NumeroPagina = m2.NumeroPagina AND m1.Item = m2.Item
            LEFT JOIN dbo.INVENTARIO AS i ON m1.CodigoBarra = i.CodigoBarra
            LEFT JOIN dbo.TOMAFISICA2 AS t2 ON m2.NumeroPagina = t2.NumeroPagina
        )
        SELECT
            NumeroPagina,
            CodigoBarra,
            Referencia,
            toma_1 AS Toma1,
            usuario_1 AS Usuario1,
            toma_2 AS Toma2,
            usuario_2 AS Usuario2,
            validacion_1 AS Validacion1,
            estado AS Estado,
            Existencia,
            v2_calculada AS Validacion2,
            v2_calculada AS Validacion3,
            CASE WHEN v2_calculada = 0 THEN 'SI' ELSE 'No' END AS Coincidencia
        FROM CalculosBase
        """;

    private readonly InventoryDbContext _context;

    public PhysicalInventoryRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<PhysicalInventoryItem>> GetItemsAsync(
        CancellationToken cancellationToken = default)
    {
        var rows = await _context.PhysicalInventoryResults
            .FromSqlRaw(Query)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return rows.Select(r => new PhysicalInventoryItem(
            r.NumeroPagina, r.CodigoBarra, r.Referencia,
            r.Toma1, r.Usuario1, r.Toma2, r.Usuario2,
            r.Validacion1, r.Estado, r.Existencia,
            r.Validacion2, r.Validacion3, r.Coincidencia))
            .ToList();
    }
}