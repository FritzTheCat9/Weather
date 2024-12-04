using FluentValidation;
using MediatR;
using Weather.Api.Data.Repositories;
using Weather.Api.Exceptions;
using Weather.Api.Helpers;
using static Weather.Api.Features.Cities.Extensions.CityExtensions;

namespace Weather.Api.Features.Cities.Queries;

public static class GetCityFeature
{
    public class Query : IRequest<CityDto>
    {
        public int Id { get; init; }
    }

    public class Validator : AbstractValidator<Query> { }

    public static void Endpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/cities/{id:int}", async (
                int id,
                IMediator mediator,
                CancellationToken cancellationToken) =>
            {
                var query = new Query { Id = id };
                return Results.Ok(await mediator.Send(query, cancellationToken));
            })
            .WithName("GetCity")
            .WithTags(Tags.Cities)
            .AllowAnonymous();
    }

    public class Handler(
        ICityRepository cityRepository)
        : IRequestHandler<Query, CityDto>
    {
        public async Task<CityDto> Handle(
            Query query,
            CancellationToken cancellationToken)
        {
            var city = await cityRepository.Get(query.Id) ?? throw new MyNotFoundException();

            return city.ToDto();
        }
    }
}