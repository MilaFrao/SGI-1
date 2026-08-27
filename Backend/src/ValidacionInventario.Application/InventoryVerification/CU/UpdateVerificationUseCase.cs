using ValidacionInventario.Application.InventoryVerification.Contracts;
using ValidacionInventario.Application.InventoryVerification.Interfaces;

namespace ValidacionInventario.Application.InventoryVerification.CU;

public sealed class UpdateVerificationUseCase
{
    private readonly IVerificationRepository _repository;

    public UpdateVerificationUseCase(IVerificationRepository repository)
    {
        _repository = repository;
    }

    public Task ExecuteAsync(UpdateVerificationRequest request, CancellationToken cancellationToken = default)
        => _repository.UpsertAsync(request, cancellationToken);
}