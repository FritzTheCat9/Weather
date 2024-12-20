﻿using MediatR;
using Weather.Api.Helpers;
using FluentValidation;
using Weather.Api.Data.Repositories;
using Weather.Api.Services;
using static Weather.Api.Features.Cities.Extensions.CityExtensions;

namespace Weather.Api.Features.Cities.Queries;

public static class GetAllCitiesFeature
{
    public class Query : IRequest<IEnumerable<CityDto>> { }

    public class Validator : AbstractValidator<Query> { }

    public static void Endpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/cities/all", async (
                Query query,
                IMediator mediator,
                CancellationToken cancellationToken) =>
            {
                return Results.Ok(await mediator.Send(query, cancellationToken));
            })
            .WithTags(Tags.Cities)
            .AllowAnonymous();
    }

    public class Handler(
        ICityRepository cityRepository,
        IWeatherService weatherService)
        : IRequestHandler<Query, IEnumerable<CityDto>>
    {
        public async Task<IEnumerable<CityDto>> Handle(
            Query query,
            CancellationToken cancellationToken)
        {
            var cities = await cityRepository.GetAll();
            var citiesDtos = cities.ToCityDtos();

            var cityDtos = citiesDtos as CityDto[] ?? citiesDtos.ToArray();

            foreach (var city in cityDtos)
            {
                city.WeatherInfoDto = await weatherService.GetWeatherInfo(city.Name);
            }

            return cityDtos;
        }
    }
}