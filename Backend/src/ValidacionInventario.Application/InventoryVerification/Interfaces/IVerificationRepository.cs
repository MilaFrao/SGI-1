using ValidacionInventario.Application.InventoryVerification.Contracts;

namespace ValidacionInventario.Application.InventoryVerification.Interfaces;

public interface IVerificationRepository
{
    Task UpsertAsync(UpdateVerificationRequest request, CancellationToken cancellationToken = default);
}