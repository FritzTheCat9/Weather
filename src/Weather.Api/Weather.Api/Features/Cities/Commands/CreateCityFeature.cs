using FluentValidation;
using MediatR;
using Weather.Api.Data.Entities;
using Weather.Api.Data.Repositories;
using Weather.Api.Helpers;

namespace Weather.Api.Features.Cities.Commands;

public static class CreateCityFeature
{
    public class Command : IRequest<int>
    {
        public string Name { get; set; }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            // name not empty 
            // first name letter should be from uppercase (or set it in logic)
        }
    }

    public static void Endpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/cities", async (
                Command command,
                IMediator mediator,
                CancellationToken cancellationToken) =>
            {
                var cityId = await mediator.Send(command, cancellationToken);
                return Results.CreatedAtRoute("GetCity", new { id = cityId }, cityId);
            })
            .WithTags(Tags.Cities)
            .AllowAnonymous();
    }

    public class Handler(ICityRepository cityRepository)
        : IRequestHandler<Command, int>
    {
        public async Task<int> Handle(
            Command command,
            CancellationToken cancellationToken)
        {
            // validate: city with given name exist

            var city = new City
            {
                Id = 0,
                Name = command.Name
            };

            return await cityRepository.Create(city);
        }
    }
}