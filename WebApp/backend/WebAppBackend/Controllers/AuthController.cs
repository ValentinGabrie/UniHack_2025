using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebAppBackend.Data;
using WebAppBackend.DTO;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController
{
    private readonly ApplicationDbContext _context;
    
    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    public void Login(LoginDto loginDto)
    {
    }
}