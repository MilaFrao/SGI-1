namespace ValidacionInventario.Application.PhysicalInventory.Contracts;

public sealed record PhysicalInventoryItemResponse(
    int NumeroPagina,
    string CodigoBarra,
    string? Referencia,
    decimal Toma1,
    string Usuario1,
    decimal Toma2,
    string? Usuario2,
    decimal Validacion1,
    string Estado,
    decimal Existencia,
    decimal Validacion2,
    decimal Validacion3,
    string Coincidencia,
    string EstadoVerificacion);