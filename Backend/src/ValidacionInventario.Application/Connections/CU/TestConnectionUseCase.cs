using ValidacionInventario.Application.Connections.Contracts;
using ValidacionInventario.Application.Connections.Interfaces;

namespace ValidacionInventario.Application.Connections.CU;

public sealed class TestConnectionUseCase
{
    private readonly IConnectionTester _connectionTester;

    public TestConnectionUseCase(IConnectionTester connectionTester)
    {
        _connectionTester = connectionTester;
    }
    public Task<TestConnectionResponse> ExecuteAsync(TestConnectionRequest request, CancellationToken cancellationToken=default)
    {
        return _connectionTester.TestConnectionAsync(request, cancellationToken);
    }

}