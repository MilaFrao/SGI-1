using ValidacionInventario.Infrastructure;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

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

builder.Services.AddInfrastructure(builder.Configuration); // ver punto 3

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy"); // antes de los endpoints, después de HttpsRedirection

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", service = "InventoryValidation API" }));

app.Run();