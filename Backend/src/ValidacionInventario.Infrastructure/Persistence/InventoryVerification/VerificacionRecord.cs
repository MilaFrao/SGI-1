namespace ValidacionInventario.Infrastructure.Persistence.InventoryVerification;

public sealed class VerificacionRecord
{
    public int NumeroPagina { get; set; }
    public string CodigoBarra { get; set; } = null!;
    public string? Referencia { get; set; }
    public bool Verificado { get; set; }
    public DateTime FechaVerificacion { get; set; }
    public decimal Toma1Snapshot { get; set; }
    public decimal Toma2Snapshot { get; set; }
    public decimal ExistenciaSnapshot { get; set; }
    public string CoincidenciaSnapshot { get; set; } = null!;
}