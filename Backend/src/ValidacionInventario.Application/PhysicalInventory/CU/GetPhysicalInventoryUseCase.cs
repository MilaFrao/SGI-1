using ValidacionInventario.Application.PhysicalInventory.Contracts;
using ValidacionInventario.Application.PhysicalInventory.Interfaces;

namespace ValidacionInventario.Application.PhysicalInventory.CU;

public sealed class GetPhysicalInventoryUseCase
{
    private readonly IPhysicalInventoryRepository _repository;

    public GetPhysicalInventoryUseCase(IPhysicalInventoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<PhysicalInventoryItemResponse>> ExecuteAsync(
        CancellationToken cancellationToken = default)
    {
        var items = await _repository.GetItemsAsync(cancellationToken);

        return items.Select(i => new PhysicalInventoryItemResponse(
            i.NumeroPagina, i.CodigoBarra, i.Referencia,
            i.Toma1, i.Usuario1, i.Toma2, i.Usuario2,
            i.Validacion1, i.Estado, i.Existencia,
            i.Validacion2, i.Validacion3, i.Coincidencia))
            .ToList();
    }
}