namespace ValidacionInventario.Application.Connections.Interfaces;

public interface IConnectionStringProvider
{
    string? CurrentConnectionString { get; }
    void SetConnection(string server, string database, string user, string password);
}