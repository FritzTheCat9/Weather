namespace Weather.Api.Services;

public static class ServiceExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IWeatherService, WeatherService>();
        
        return services;
    }
}