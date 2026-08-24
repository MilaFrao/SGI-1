using ValidacionInventario.Application;
using ValidacionInventario.Infrastructure;
using ValidacionInventario.Api.Endpoints.Connections;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// CORS: el front corre en Vite (5173) por defecto
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "ValidacionInventario API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy"); // antes de los endpoints, después de HttpsRedirection

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", service = "InventoryValidation API" }));
app.MapTestConnection();

app.Run();