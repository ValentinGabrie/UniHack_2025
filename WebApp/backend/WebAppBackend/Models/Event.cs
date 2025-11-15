using System.ComponentModel.DataAnnotations;

namespace WebAppBackend.Models;

public class Event
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    
    public string Address { get; set; } = null!;
    
    public DateTime Date { get; set; }
}