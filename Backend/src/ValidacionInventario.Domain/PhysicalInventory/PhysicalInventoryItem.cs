namespace ValidacionInventario.Domain.PhysicalInventory;

public sealed class PhysicalInventoryItem
{
    public int NumeroPagina { get; }
    public string CodigoBarra { get; }
    public string? Referencia { get; }
    public decimal Toma1 { get; }
    public string Usuario1 { get; }
    public decimal Toma2 { get; }
    public string? Usuario2 { get; }
    public decimal Validacion1 { get; }
    public string Estado { get; }
    public decimal Existencia { get; }
    public decimal Validacion2 { get; }
    public decimal Validacion3 { get; }
    public string Coincidencia { get; }

    public PhysicalInventoryItem(
        int numeroPagina, string codigoBarra, string? referencia,
        decimal toma1, string usuario1, decimal toma2, string? usuario2,
        decimal validacion1, string estado, decimal existencia,
        decimal validacion2, decimal validacion3, string coincidencia)
    {
        NumeroPagina = numeroPagina;
        CodigoBarra = codigoBarra;
        Referencia = referencia;
        Toma1 = toma1;
        Usuario1 = usuario1;
        Toma2 = toma2;
        Usuario2 = usuario2;
        Validacion1 = validacion1;
        Estado = estado;
        Existencia = existencia;
        Validacion2 = validacion2;
        Validacion3 = validacion3;
        Coincidencia = coincidencia;
    }
}