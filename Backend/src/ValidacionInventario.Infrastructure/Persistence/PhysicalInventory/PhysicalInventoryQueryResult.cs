namespace ValidacionInventario.Infrastructure.Persistence.PhysicalInventory;

public sealed class PhysicalInventoryQueryResult
{
    public int NumeroPagina { get; set; }
    public string CodigoBarra { get; set; } = null!;
    public string? Referencia { get; set; }
    public decimal Toma1 { get; set; }
    public string Usuario1 { get; set; } = null!;
    public decimal Toma2 { get; set; }
    public string? Usuario2 { get; set; }
    public decimal Validacion1 { get; set; }
    public string Estado { get; set; } = null!;
    public decimal Existencia { get; set; }
    public decimal Validacion2 { get; set; }
    public decimal Validacion3 { get; set; }
    public string Coincidencia { get; set; } = null!;
}