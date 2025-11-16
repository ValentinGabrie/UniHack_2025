namespace WebAppBackend.DTO;

public class LoginDto
{
    public required string Email { get; set; }  // Can be email OR username
    public required string Password { get; set; }
}