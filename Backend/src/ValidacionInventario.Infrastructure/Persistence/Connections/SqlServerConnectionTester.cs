using Microsoft.Data.SqlClient;
using ValidacionInventario.Application.Connections.Contracts;
using ValidacionInventario.Application.Connections.Interfaces;

namespace ValidacionInventario.Infrastructure.Persistence.Connections;

public sealed class SqlServerConnectionTester : IConnectionTester
{
    public async Task<TestConnectionResponse> TestConnectionAsync(
        TestConnectionRequest request,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var connectionStringBuilder = new SqlConnectionStringBuilder
            {
                DataSource = request.Server,
                InitialCatalog = request.Database,
                TrustServerCertificate = true,
                ConnectTimeout = 10
            };

            await using var connection =
                new SqlConnection(connectionStringBuilder.ConnectionString);

            await connection.OpenAsync(cancellationToken);

            return new TestConnectionResponse(
                true,
                "Conexión establecida correctamente.");
        }
        catch (SqlException)
        {
            return new TestConnectionResponse(
                false,
                "No fue posible establecer la conexión con la base de datos.");
        }
        catch (Exception)
        {
            return new TestConnectionResponse(
                false,
                "Ocurrió un error al intentar establecer la conexión.");
        }
    }
}