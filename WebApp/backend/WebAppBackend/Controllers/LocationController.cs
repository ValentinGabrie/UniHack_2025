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
    public async Task<ActionResult<List<Location>>> Get(int id)
    {
        return await _context.Locations.ToListAsync();
    }
    
   
    
}