namespace ValidacionInventario.Application.InventoryVerification.Contracts;

public sealed record UpdateVerificationRequest(
    int NumeroPagina,
    string CodigoBarra,
    bool Verificado);