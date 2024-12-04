using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Weather.Api.Data.Entities;

namespace Weather.Api.Data.Database;

public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<City> Cities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        modelBuilder.Entity<City>().HasData(new List<City>
        {
            new()
            {
                Id = 1,
                Name = "Białystok"
            },
            new()
            {
                Id = 2,
                Name = "Piaseczno"
            },
            new()
            {
                Id = 3,
                Name = "Warszawa"
            },
            new()
            {
                Id = 4,
                Name = "Troszyn"
            }
        });
    }
}