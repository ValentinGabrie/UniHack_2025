using System.ComponentModel.DataAnnotations;

namespace WebAppBackend.Models;

public class Location
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public string? State { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Type { get; set; }  // restaurant, pub, bistro, etc.
    public string? Cuisine { get; set; }  // Romanian, Italian, etc.
    public double Rating { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}