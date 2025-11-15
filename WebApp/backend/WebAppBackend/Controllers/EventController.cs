using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.Models;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public EventController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents()
    {
        return await _context.Events.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var requestedEvent = await _context.Events.FindAsync(id);
        if (requestedEvent == null)
        {
            return NotFound();
        }
        return requestedEvent;
    }

    [HttpPost]
    public async Task<ActionResult<Event>> PostEvent(Event eventToBePosted)
    {
        _context.Events.Add(eventToBePosted);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvent), new { id = eventToBePosted.Id }, eventToBePosted);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Event eventToModify, int id)
    {
        if (id != eventToModify.Id)
        {
            return BadRequest("id is not correct");
        }

        _context.Entry(eventToModify).State = EntityState.Modified; 
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
        var eventToDelete = await _context.Events.FindAsync(id);
        _context.Events.Remove(eventToDelete);
        await _context.SaveChangesAsync();
    }
}