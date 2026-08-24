using ValidacionInventario.Application.Connections.Contracts;

namespace ValidacionInventario.Application.Connections.Interfaces;

public interface IConnectionTester
{
    Task<TestConnectionResponse> TestConnectionAsync(TestConnectionRequest request, CancellationToken cancellationToken);
}