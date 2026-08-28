using Microsoft.Data.SqlClient;
using ValidacionInventario.Application.Connections.Interfaces;

namespace ValidacionInventario.Infrastructure.Persistence.Connections;

public sealed class ConnectionStringProvider : IConnectionStringProvider
{
    public string? CurrentConnectionString { get; private set; }

    public void SetConnection(string server, string database, string user, string password)
    {
        var builder = new SqlConnectionStringBuilder
        {
            DataSource = server,
            InitialCatalog = database,
            UserID = user,
            Password = password,
            TrustServerCertificate = true,
            ConnectTimeout = 10
        };

        CurrentConnectionString = builder.ConnectionString;
    }
}