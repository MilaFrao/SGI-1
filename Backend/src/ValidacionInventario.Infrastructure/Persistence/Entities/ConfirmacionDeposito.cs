using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class ConfirmacionDeposito
{
    public int Id { get; set; }

    public DateTime FechaRegistro { get; set; }

    public DateTime FechaDeposito { get; set; }

    public DateTime FechaVenta { get; set; }

    public string NumeroDeposito { get; set; } = null!;

    public string CodigoBanco { get; set; } = null!;

    public decimal Monto { get; set; }

    public string? Nota { get; set; }

    /// <summary>
    /// 0 = Guardado; 1 = Eliminado; 
    /// </summary>
    public byte Status { get; set; }
}
