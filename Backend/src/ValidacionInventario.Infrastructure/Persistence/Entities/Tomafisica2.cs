using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class Tomafisica2
{
    public int NumeroPagina { get; set; }

    public DateTime Fecha { get; set; }

    public string Observacion { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public byte Status { get; set; }

    public string? Autor { get; set; }

    public virtual ICollection<Movtomafisica2> Movtomafisica2s { get; set; } = new List<Movtomafisica2>();

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
