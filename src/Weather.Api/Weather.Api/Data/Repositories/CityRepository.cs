using Microsoft.EntityFrameworkCore;
using Weather.Api.Data.Database;
using Weather.Api.Data.Entities;

namespace Weather.Api.Data.Repositories
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAll();
        Task<City> Get(int id);
        Task<int> Create(City city);
        Task Update(City city);
        Task Delete(City city);
    }

    public class CityRepository(AppDbContext dbContext) : ICityRepository
    {
        public async Task<IEnumerable<City>> GetAll()
        {
            return await dbContext.Cities.ToListAsync();
        }

        public async Task<City> Get(int id)
        {
            return await dbContext.Cities.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Create(City city)
        {
            await dbContext.AddAsync(city);
            await dbContext.SaveChangesAsync();
            return city.Id;
        }

        public Task Update(City city)
        {
            dbContext.Update(city);
            return Task.CompletedTask;
        }

        public Task Delete(City city)
        {
            dbContext.Remove(city);
            return Task.CompletedTask;
        }
    }
}
