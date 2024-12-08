using System.Text.Json;
using System.Web;
using Weather.Api.Features.Cities.Extensions;

namespace Weather.Api.Services;

public interface IWeatherService
{
    Task<CityExtensions.WeatherInfoDto> GetWeatherInfo(string city);
}

public class WeatherService : IWeatherService
{
    public async Task<CityExtensions.WeatherInfoDto> GetWeatherInfo(string city)
    {
        var encodedCity = HttpUtility.UrlEncode(city);
        var url = $"https://wttr.in/{encodedCity}?format=j1";
        using var client = new HttpClient();

        try
        {
            var weatherDataJson = await client.GetStringAsync(url);
            var weatherData = JsonDocument.Parse(weatherDataJson);
            var currentCondition = weatherData
                .RootElement
                .GetProperty("current_condition")[0];

            var iconUrl = $"https://wttr.in/{encodedCity}?format=\"%c\"";
            var iconDataJson = await client.GetStringAsync(iconUrl);

            return new CityExtensions.WeatherInfoDto
            {
                Temperature = currentCondition.GetProperty("temp_C").GetString(),
                Humidity = currentCondition.GetProperty("humidity").GetString(),
                Pressure = currentCondition.GetProperty("pressure").GetString(),
                Description = currentCondition.GetProperty("weatherDesc")[0].GetProperty("value").GetString(),
                WindSpeedKmph = currentCondition.GetProperty("windspeedKmph").GetString(),
                Icon = iconDataJson.Replace("\"", "").Trim()
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return null;
        }
    }
}