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
            return new TestConnectionResponse(false, TranslateSqlError(ex));
        }
        catch (Exception)
        {
            return new TestConnectionResponse(
                false,
                "Ocurrió un error inesperado al intentar establecer la conexión.");
        }
    }

    private static string TranslateSqlError(SqlException ex) => ex.Number switch
    {
        18456 => "El usuario o la contraseña no son válidos para este servidor.",
        4060 => "La base de datos indicada no existe, o el usuario no tiene permisos sobre ella.",
        -2 => "El servidor tardó demasiado en responder. Verifica que el nombre del servidor sea correcto y que esté accesible en la red.",
        53 or 11001 or 40 => "No fue posible encontrar el servidor indicado. Verifica el nombre o la dirección.",
        _ => "No fue posible establecer la conexión con la base de datos.",
    };
}