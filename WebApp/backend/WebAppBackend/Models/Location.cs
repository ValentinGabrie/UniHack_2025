using System.ComponentModel.DataAnnotations;

namespace WebAppBackend.Models;

public class Location
{
      [Key]
    public required int LocationId { get; set; }
    public required string address { get; set; }
    public required string city { get; set; }
    public required string state { get; set; }
}