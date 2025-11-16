ale
alreadymorning_ale
🦋 555

Acesta este începutul canalului #cod🙉. 
crunchy — 11:38
Perfect! Hai să adăugăm funcționalitate completă pentru hartă cu Google Maps și să conectăm locațiile la backend.

## 🗺️ PARTEA 1: Backend - Location API

### 1. Verifică Location Model
Extinde
message.txt
5 KB
modificari pt harta functionala
crunchy — 11:45
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.Models;

namespace WebAppBackend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.Models;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LocationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/locations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Location>>> GetLocations(
        [FromQuery] string? type = null,
        [FromQuery] string? cuisine = null,
        [FromQuery] double? minRating = null)
    {
        var query = _context.Locations.AsQueryable();

        // Filter by type
        if (!string.IsNullOrEmpty(type))
        {
            query = query.Where(l => l.Type == type);
        }

        // Filter by cuisine
        if (!string.IsNullOrEmpty(cuisine))
        {
            query = query.Where(l => l.Cuisine == cuisine);
        }

        // Filter by rating
        if (minRating.HasValue)
        {
            query = query.Where(l => l.Rating >= minRating.Value);
        }

        var locations = await query.OrderByDescending(l => l.Rating).ToListAsync();
        return Ok(locations);
    }

    // GET: api/locations/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Location>> GetLocation(int id)
    {
        var location = await _context.Locations.FindAsync(id);

        if (location == null)
        {
            return NotFound(new { message = "Location not found" });
        }

        return Ok(location);
    }

    // POST: api/locations
    [HttpPost]
    public async Task<ActionResult<Location>> CreateLocation(Location location)
    {
        _context.Locations.Add(location);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLocation), new { id = location.Id }, location);
    }

    // PUT: api/locations/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLocation(int id, Location location)
    {
        if (id != location.Id)
        {
            return BadRequest(new { message = "ID mismatch" });
        }

        _context.Entry(location).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Locations.Any(l => l.Id == id))
            {
                return NotFound(new { message = "Location not found" });
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/locations/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLocation(int id)
    {
        var location = await _context.Locations.FindAsync(id);
        if (location == null)
        {
            return NotFound(new { message = "Location not found" });
        }

        _context.Locations.Remove(location);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/locations/types
    [HttpGet("types")]
    public async Task<ActionResult<IEnumerable<string>>> GetLocationTypes()
    {
        var types = await _context.Locations
            .Select(l => l.Type)
            .Where(t => !string.IsNullOrEmpty(t))
            .Distinct()
            .ToListAsync();

        return Ok(types);
    }

    // GET: api/locations/cuisines
    [HttpGet("cuisines")]
    public async Task<ActionResult<IEnumerable<string>>> GetCuisines()
    {
        var cuisines = await _context.Locations
            .Select(l => l.Cuisine)
            .Where(c => !string.IsNullOrEmpty(c))
            .Distinct()
            .ToListAsync();

        return Ok(cuisines);
    }

    // POST: api/locations/seed - Pentru a popula date test
    [HttpPost("seed")]
    public async Task<IActionResult> SeedLocations()
    {
        // Check if already seeded
        if (await _context.Locations.AnyAsync())
        {
            return BadRequest(new { message = "Locations already seeded" });
        }

        var locations = new List<Location>
        {
            new Location { Name = "Suta de grame", Address = "Piața Unirii", City = "Timișoara", Latitude = 45.7537, Longitude = 21.2257, Type = "restaurant", Cuisine = "Romanian", Rating = 9.5 },
            new Location { Name = "80's pub", Address = "Strada Alba Iulia", City = "Timișoara", Latitude = 45.7570, Longitude = 21.2290, Type = "pub", Cuisine = "Pub", Rating = 9.0 },
            new Location { Name = "Jack's bistro", Address = "Piața Victoriei", City = "Timișoara", Latitude = 45.7489, Longitude = 21.2087, Type = "bistro", Cuisine = "Bistro", Rating = 9.5 },
            new Location { Name = "Little Hanoi", Address = "Strada Mărășești", City = "Timișoara", Latitude = 45.7561, Longitude = 21.2269, Type = "restaurant", Cuisine = "Vietnamese", Rating = 9.0 },
            new Location { Name = "Riyo", Address = "Strada Eugeniu de Savoya", City = "Timișoara", Latitude = 45.7575, Longitude = 21.2301, Type = "restaurant", Cuisine = "Japanese", Rating = 9.5 },
            new Location { Name = "La Focacceria", Address = "Piața Unirii", City = "Timișoara", Latitude = 45.7550, Longitude = 21.2280, Type = "restaurant", Cuisine = "Italian", Rating = 9.0 },
            new Location { Name = "Hype culture", Address = "Bulevardul Revoluției", City = "Timișoara", Latitude = 45.7520, Longitude = 21.2240, Type = "restaurant", Cuisine = "Modern", Rating = 9.0 },
            new Location { Name = "Eat like a man", Address = "Strada Take Ionescu", City = "Timișoara", Latitude = 45.7545, Longitude = 21.2265, Type = "steakhouse", Cuisine = "Steakhouse", Rating = 9.5 },
            new Location { Name = "Why pizza", Address = "Strada Lucian Blaga", City = "Timișoara", Latitude = 45.7535, Longitude = 21.2295, Type = "restaurant", Cuisine = "Pizza", Rating = 9.0 },
            new Location { Name = "Taverna racilor", Address = "Strada Popa Șapcă", City = "Timișoara", Latitude = 45.7560, Longitude = 21.2275, Type = "restaurant", Cuisine = "Seafood", Rating = 9.5 }
        };

        _context.Locations.AddRange(locations);
        await _context.SaveChangesAsync();

        return Ok(new { message = $"{locations.Count} locations seeded successfully" });
    }
}