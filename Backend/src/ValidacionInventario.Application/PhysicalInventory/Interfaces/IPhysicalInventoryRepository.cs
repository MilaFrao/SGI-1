using ValidacionInventario.Domain.PhysicalInventory;

namespace ValidacionInventario.Application.PhysicalInventory.Interfaces;

public interface IPhysicalInventoryRepository
{
    Task<IReadOnlyList<PhysicalInventoryItem>> GetItemsAsync(CancellationToken cancellationToken = default);
}