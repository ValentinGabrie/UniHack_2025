using Microsoft.AspNetCore.Mvc;
using WebAppBackend.Services;

namespace WebAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MapsController : ControllerBase
{
    private readonly GoogleMapsService _mapsService;

    public MapsController(GoogleMapsService mapsService)
    {
        _mapsService = mapsService;
    }

    [HttpGet("geocode")]
    public async Task<IActionResult> Geocode([FromQuery] string address)
    {
        if (string.IsNullOrWhiteSpace(address))
        {
            return BadRequest(new { error = "Address is required" });
        }

        try
        {
            var result = await _mapsService.GeocodeAddress(address);
            
            if (result == null)
            {
                return NotFound(new { error = "Address not found" });
            }

            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to geocode address", details = ex.Message });
        }
    }
}