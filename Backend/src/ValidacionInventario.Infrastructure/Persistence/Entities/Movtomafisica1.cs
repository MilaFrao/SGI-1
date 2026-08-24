using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class Movtomafisica1
{
    public int NumeroPagina { get; set; }

    public int Item { get; set; }

    public string CodigoBarra { get; set; } = null!;

    public decimal Cantidad { get; set; }

    public DateTime? Hora { get; set; }

    public virtual Inventario CodigoBarraNavigation { get; set; } = null!;

    public virtual Tomafisica1 NumeroPaginaNavigation { get; set; } = null!;
}
