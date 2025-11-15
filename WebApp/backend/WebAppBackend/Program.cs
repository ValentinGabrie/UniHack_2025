using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.Services;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// HTTP Client for external APIs
builder.Services.AddHttpClient<GoogleMapsService>();

// CORS - Dynamic configuration
var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]?.Split(',') 
    ?? new[] { "http://localhost", "http://localhost:80", "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Health checks - VERSION SIMPLĂ
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

// Apply migrations automatically
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await db.Database.MigrateAsync();
    Console.WriteLine("✅ Database migrations applied successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Migration failed: {ex.Message}");
    Console.WriteLine("⚠️  Application will continue but database may not be initialized.");
}

app.Run();