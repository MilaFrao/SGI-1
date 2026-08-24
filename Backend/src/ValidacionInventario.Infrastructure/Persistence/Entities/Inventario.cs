using System;
using System.Collections.Generic;

namespace ValidacionInventario.Infrastructure.Persistence.Entities;

public partial class Inventario
{
    public string CodigoBarra { get; set; } = null!;

    public string Referencia { get; set; } = null!;

    public string CodigoMarca { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Talla { get; set; } = null!;

    public string CodigoColor { get; set; } = null!;

    public string Fabricante { get; set; } = null!;

    public string Categoria { get; set; } = null!;

    public string? Nota { get; set; }

    public byte TipoImpuesto { get; set; }

    public decimal PrecioDetal { get; set; }

    public decimal PrecioMayor { get; set; }

    public decimal PrecioAfiliado { get; set; }

    public decimal PrecioPromocion { get; set; }

    public bool Promocion { get; set; }

    public DateTime FechaInicial { get; set; }

    public DateTime FechaFinal { get; set; }

    public decimal CostoInicial { get; set; }

    public decimal CostoPromedio { get; set; }

    public decimal UltimoCosto { get; set; }

    public decimal CostoDolar { get; set; }

    public decimal ExistenciaInicial { get; set; }

    public decimal Existencia { get; set; }

    public decimal PuntoReorden { get; set; }

    public DateTime? FechaPrimerMovimiento { get; set; }

    public DateTime? UltimaActualizacion { get; set; }

    public byte Tipo { get; set; }

    public byte Status { get; set; }

    public byte Serializado { get; set; }

    public string CodigoBarraAnt { get; set; } = null!;

    public string? CodigoFamilia { get; set; }

    public virtual ICollection<Movtomafisica1> Movtomafisica1s { get; set; } = new List<Movtomafisica1>();

    public virtual ICollection<Movtomafisica2> Movtomafisica2s { get; set; } = new List<Movtomafisica2>();
}
