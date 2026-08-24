using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ValidacionInventario.Infrastructure.Persistence.Entities;
using ValidacionInventario.Infrastructure.Persistence.PhysicalInventory;

namespace ValidacionInventario.Infrastructure.Persistence.Contexts;

public partial class InventoryDbContext : DbContext
{
    public InventoryDbContext(DbContextOptions<InventoryDbContext> options)
        : base(options)
    {
    }

    public DbSet<PhysicalInventoryQueryResult> PhysicalInventoryResults => Set<PhysicalInventoryQueryResult>();

    public virtual DbSet<ConfirmacionDeposito> ConfirmacionDepositos { get; set; }

    public virtual DbSet<Inventario> Inventarios { get; set; }

    public virtual DbSet<Movtomafisica1> Movtomafisica1s { get; set; }

    public virtual DbSet<Movtomafisica2> Movtomafisica2s { get; set; }

    public virtual DbSet<Tomafisica1> Tomafisica1s { get; set; }

    public virtual DbSet<Tomafisica2> Tomafisica2s { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Modern_Spanish_CI_AS");

        modelBuilder.Entity<PhysicalInventoryQueryResult>().HasNoKey().ToView(null);

        modelBuilder.Entity<ConfirmacionDeposito>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CONFIRMACION_DEPOSITO");

            entity.HasIndex(e => e.Id, "IX_ID").IsUnique();

            entity.Property(e => e.CodigoBanco)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.FechaDeposito).HasColumnType("datetime");
            entity.Property(e => e.FechaRegistro).HasColumnType("datetime");
            entity.Property(e => e.FechaVenta).HasColumnType("datetime");
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Monto).HasColumnType("numeric(18, 2)");
            entity.Property(e => e.Nota).IsUnicode(false);
            entity.Property(e => e.NumeroDeposito)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasComment("0 = Guardado; 1 = Eliminado; ");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasKey(e => e.CodigoBarra);

            entity.ToTable("INVENTARIO");

            entity.Property(e => e.CodigoBarra)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Categoria)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.CodigoBarraAnt)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CodigoColor)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.CodigoFamilia)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CodigoMarca)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.CostoDolar).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.CostoInicial).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.CostoPromedio).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.Existencia).HasColumnType("numeric(18, 2)");
            entity.Property(e => e.ExistenciaInicial).HasColumnType("numeric(18, 2)");
            entity.Property(e => e.Fabricante)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.FechaFinal).HasColumnType("smalldatetime");
            entity.Property(e => e.FechaInicial).HasColumnType("smalldatetime");
            entity.Property(e => e.FechaPrimerMovimiento).HasColumnType("smalldatetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nota)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PrecioAfiliado).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.PrecioDetal).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.PrecioMayor).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.PrecioPromocion).HasColumnType("numeric(24, 8)");
            entity.Property(e => e.PuntoReorden).HasColumnType("numeric(18, 2)");
            entity.Property(e => e.Referencia)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Talla)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.TipoImpuesto).HasDefaultValue((byte)1, "DF_INVENTARIO_TipoImpuesto");
            entity.Property(e => e.UltimaActualizacion).HasColumnType("smalldatetime");
            entity.Property(e => e.UltimoCosto).HasColumnType("numeric(24, 8)");
        });

        modelBuilder.Entity<Movtomafisica1>(entity =>
        {
            entity.HasKey(e => new { e.NumeroPagina, e.Item });

            entity.ToTable("MOVTOMAFISICA1");

            entity.Property(e => e.Cantidad).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CodigoBarra)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasColumnType("smalldatetime");

            entity.HasOne(d => d.CodigoBarraNavigation).WithMany(p => p.Movtomafisica1s)
                .HasForeignKey(d => d.CodigoBarra)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MOVTOMAFISICA1_INVENTARIO");

            entity.HasOne(d => d.NumeroPaginaNavigation).WithMany(p => p.Movtomafisica1s)
                .HasForeignKey(d => d.NumeroPagina)
                .HasConstraintName("FK_MOVTOMAFISICA1_TOMAFISICA1");
        });

        modelBuilder.Entity<Movtomafisica2>(entity =>
        {
            entity.HasKey(e => new { e.NumeroPagina, e.Item });

            entity.ToTable("MOVTOMAFISICA2");

            entity.Property(e => e.Cantidad).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CodigoBarra)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasColumnType("smalldatetime");

            entity.HasOne(d => d.CodigoBarraNavigation).WithMany(p => p.Movtomafisica2s)
                .HasForeignKey(d => d.CodigoBarra)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MOVTOMAFISICA2_INVENTARIO");

            entity.HasOne(d => d.NumeroPaginaNavigation).WithMany(p => p.Movtomafisica2s)
                .HasForeignKey(d => d.NumeroPagina)
                .HasConstraintName("FK_MOVTOMAFISICA2_TOMAFISICA2");
        });

        modelBuilder.Entity<Tomafisica1>(entity =>
        {
            entity.HasKey(e => e.NumeroPagina);

            entity.ToTable("TOMAFISICA1");

            entity.Property(e => e.NumeroPagina).ValueGeneratedNever();
            entity.Property(e => e.Autor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("autor");
            entity.Property(e => e.Fecha).HasColumnType("smalldatetime");
            entity.Property(e => e.Observacion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasDefaultValue("", "DF_TOMAFISICA1_Observacion");
            entity.Property(e => e.Usuario)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Tomafisica1s)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TOMAFISICA1_USUARIOS");
        });

        modelBuilder.Entity<Tomafisica2>(entity =>
        {
            entity.HasKey(e => e.NumeroPagina);

            entity.ToTable("TOMAFISICA2");

            entity.Property(e => e.NumeroPagina).ValueGeneratedNever();
            entity.Property(e => e.Autor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("autor");
            entity.Property(e => e.Fecha).HasColumnType("smalldatetime");
            entity.Property(e => e.Observacion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasDefaultValue("", "DF_TOMAFISICA2_Observacion");
            entity.Property(e => e.Usuario)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Tomafisica2s)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TOMAFISICA2_USUARIOS");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.CodUsuario);

            entity.ToTable("USUARIOS");

            entity.Property(e => e.CodUsuario)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Pasword)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
