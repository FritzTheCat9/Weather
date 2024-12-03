using Microsoft.EntityFrameworkCore;
using Weather.Api.Data.Repositories;
using Weather.Api.Extensions;

namespace Weather.Api.Data.Database
{
    public static class DatabaseExtensions
    {
        private const string SectionName = "Database";

        public static IServiceCollection AddDatabase(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.Configure<DatabaseOptions>(configuration.GetRequiredSection(SectionName));
            var options = configuration.GetOptions<DatabaseOptions>(SectionName);

            services.AddDbContext<AppDbContext>(x =>
            {
                x.UseSqlServer(options.ConnectionString);
            });

            services.AddScoped<ICityRepository, CityRepository>();

            services.AddHostedService<DatabaseInitializer>();

            return services;
        }
    }
}
