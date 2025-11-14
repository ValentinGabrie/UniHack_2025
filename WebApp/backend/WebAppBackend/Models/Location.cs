using System.ComponentModel.DataAnnotations;

namespace WebAppBackend.Models;

public class Location
{
      [Key]
    public int LocationId { get; set; }
    public string address { get; set; }
    public string city { get; set; }
    public string state { get; set; }
}