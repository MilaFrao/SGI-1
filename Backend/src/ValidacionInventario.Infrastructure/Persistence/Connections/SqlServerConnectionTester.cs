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
                UserID = request.User,
                Password = request.Password,
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
        catch (SqlException ex)
        {
            return new TestConnectionResponse(
                false,
                $"Error SQL: {ex.Number} - {ex.Message}");
        }
        catch (Exception ex)
        {
            return new TestConnectionResponse(
                false,
                $"Ocurrió un error al intentar establecer la conexión: {ex.Message}");
        }
    }
}