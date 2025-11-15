using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.Models;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class LocationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LocationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Location>>> GetLocation()
    {
        return await _context.Locations.ToListAsync();
    }


    [HttpGet("{id}")]

    public async Task<ActionResult> GetId(int id)
    {
         var location = await _context.Locations.FindAsync(id);
         if (location == null)
             {
             return NotFound();
             }
         return Ok(location);
    }

    [HttpPost]
    public async Task<ActionResult<Location>> Post(Location location)
    {
        _context.Locations.Add(location);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLocation), new
        {
            id = location.LocationId
        }, location);
    }


    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
        var locationToDelete = await _context.Locations.FindAsync(id);
        _context.Locations.Remove(locationToDelete);
        await _context.SaveChangesAsync();
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Location location, int id)
    {
        if (id != location.LocationId)
        {
            return BadRequest("id is not correct");
        }

        _context.Entry(location).State = EntityState.Modified; 
        await _context.SaveChangesAsync();
        return NoContent();
    }
    
}
