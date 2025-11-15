using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppBackend.Data;
using WebAppBackend.DTO;
using WebAppBackend.Models;

namespace WebAppBackend.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController :  ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        var passwordsMatch = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password, true);

        if (!passwordsMatch)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        return Ok(new { message = "Successfully logged in." });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto model)
    {
        bool usernameExists = await _context.Users.AnyAsync(u => u.Username == model.Username);
        if (usernameExists)
        {
            return BadRequest(new { message = "Username already exists." });
        }
        bool emailExists = await _context.Users.AnyAsync(u => u.Email == model.Email);
        if (emailExists)
        {
            return BadRequest(new { message = "Email already exists." });
        }
        var user = new User
        {
            Username = model.Username,
            Email = model.Email,
            Password = BCrypt.Net.BCrypt.EnhancedHashPassword(model.Password, 13)
        };
        try
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return BadRequest(new { message = "Registration failed. Username or email may already be in use." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An internal server error occurred.", error = ex.Message });
        }

        return StatusCode(201, new { message = "Registration successful." });

    }


}