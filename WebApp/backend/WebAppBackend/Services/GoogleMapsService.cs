using System.Text.Json;

namespace WebAppBackend.Services;

public class GoogleMapsService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;

    public GoogleMapsService(IConfiguration configuration, HttpClient httpClient)
    {
        _apiKey = configuration["GoogleMaps:ApiKey"] ?? "";
        _httpClient = httpClient;
    }

    public async Task<GeocodingResult?> GeocodeAddress(string address)
    {
        if (string.IsNullOrEmpty(_apiKey))
        {
            throw new InvalidOperationException("Google Maps API key not configured");
        }

        var url = $"https://maps.googleapis.com/maps/api/geocode/json?address={Uri.EscapeDataString(address)}&key={_apiKey}";
        
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<GoogleGeocodingResponse>(json);

        if (result?.Results?.Length > 0)
        {
            var location = result.Results[0].Geometry.Location;
            return new GeocodingResult
            {
                Address = result.Results[0].FormattedAddress,
                Latitude = location.Lat,
                Longitude = location.Lng
            };
        }

        return null;
    }
}

public class GeocodingResult
{
    public string Address { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

// Google API Response Models
public class GoogleGeocodingResponse
{
    public GeocodingResultItem[]? Results { get; set; }
}

public class GeocodingResultItem
{
    public string FormattedAddress { get; set; } = "";
    public GeometryInfo Geometry { get; set; } = new();
}

public class GeometryInfo
{
    public LocationInfo Location { get; set; } = new();
}

public class LocationInfo
{
    public double Lat { get; set; }
    public double Lng { get; set; }
}