﻿using Weather.Api.Data.Entities;
using Weather.Api.Features.Cities.Commands;
using Weather.Api.Features.Cities.Queries;

namespace Weather.Api.Features.Cities.Extensions;

public static class CityExtensions
{
    public static IEndpointRouteBuilder AddCitiesEndpoints(this IEndpointRouteBuilder app)
    {
        CreateCityFeature.Endpoint(app);
        DeleteCityFeature.Endpoint(app);
        UpdateCityFeature.Endpoint(app);
        GetAllCitiesFeature.Endpoint(app);
        GetCityFeature.Endpoint(app);

        return app;
    }

    public static CityDto ToDto(this City city)
    {
        return new CityDto
        {
            Id = city.Id,
            Name = city.Name
        };
    }

    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WeatherInfoDto WeatherInfoDto { get; set; }
    }

    public class WeatherInfoDto
    {
        public string Temperature { get; set; }
        public string Humidity { get; set; }
        public string Pressure { get; set; }
        public string Description { get; set; }
        public string WindSpeedKmph { get; set; }
        public string Icon { get; set; }
    }

    public static IEnumerable<CityDto> ToCityDtos(this IEnumerable<City> cities)
    {
        var dtos = cities.Select(x => x.ToDto());
        return dtos;
    }
}