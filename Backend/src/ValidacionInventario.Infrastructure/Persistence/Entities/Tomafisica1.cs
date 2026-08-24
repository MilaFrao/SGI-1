using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class Tomafisica1
{
    public int NumeroPagina { get; set; }

    public DateTime Fecha { get; set; }

    public string Observacion { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public byte Status { get; set; }

    public string? Autor { get; set; }

    public virtual ICollection<Movtomafisica1> Movtomafisica1s { get; set; } = new List<Movtomafisica1>();

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
