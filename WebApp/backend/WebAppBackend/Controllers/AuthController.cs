using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebAppBackend.DTO;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController
{
    [HttpPost]
    public void Login(LoginDto loginDto)
    {
    }
}