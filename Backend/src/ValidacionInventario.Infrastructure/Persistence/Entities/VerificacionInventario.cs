namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public class VerificacionInventario
{
    public int Id { get; set; }
    public int NumeroPagina { get; set; }
    public string CodigoBarra { get; set; } = null!;
    public bool Verificado { get; set; }
    public DateTime FechaVerificacion { get; set; }
    public decimal Toma1Snapshot { get; set; }
    public decimal Toma2Snapshot { get; set; }
    public decimal ExistenciaSnapshot { get; set; }
    public string CoincidenciaSnapshot { get; set; } = null!;
}