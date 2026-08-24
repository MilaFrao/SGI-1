namespace ValidacionInventario.Application.Connections.Contracts;

public sealed record TestConnectionRequest(string Server, string Database, string User, string Password);