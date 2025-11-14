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
}