using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class Usuario
{
    public string CodUsuario { get; set; } = null!;

    public string? NombreUsuario { get; set; }

    public string? Pasword { get; set; }

    public short? Status { get; set; }

    public virtual ICollection<Tomafisica1> Tomafisica1s { get; set; } = new List<Tomafisica1>();

    public virtual ICollection<Tomafisica2> Tomafisica2s { get; set; } = new List<Tomafisica2>();
}
