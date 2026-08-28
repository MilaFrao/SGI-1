using ValidacionInventario.Application.Connections.Contracts;
using ValidacionInventario.Application.Connections.Interfaces;

namespace ValidacionInventario.Application.Connections.CU;

public sealed class TestConnectionUseCase
{
    private readonly IConnectionTester _tester;
    private readonly IConnectionStringProvider _connectionStringProvider;

    public TestConnectionUseCase(IConnectionTester tester, IConnectionStringProvider connectionStringProvider)
    {
        _tester = tester;
        _connectionStringProvider = connectionStringProvider;
    }

    public async Task<TestConnectionResponse> ExecuteAsync(
        TestConnectionRequest request,
        CancellationToken cancellationToken = default)
    {
        var result = await _tester.TestConnectionAsync(request, cancellationToken);

        if (result.Success)
        {
            _connectionStringProvider.SetConnection(request.Server, request.Database, request.User, request.Password);
        }

        return result;
    }
}