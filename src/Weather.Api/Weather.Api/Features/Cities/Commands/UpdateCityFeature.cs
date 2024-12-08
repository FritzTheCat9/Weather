using FluentValidation;
using MediatR;
using Weather.Api.Data.Repositories;
using Weather.Api.Exceptions;
using Weather.Api.Helpers;

namespace Weather.Api.Features.Cities.Commands;

public static class UpdateCityFeature
{
    public class Command : IRequest<Unit>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
        }
    }

    public static void Endpoint(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/cities/{id:int}", async (
                int id,
                Command command,
                IMediator mediator,
                CancellationToken cancellationToken) =>
            {
                command.Id = id;
                return Results.Ok(await mediator.Send(command, cancellationToken));
            })
            .WithTags(Tags.Cities)
            .AllowAnonymous();
    }

    public class Handler(
        ICityRepository cityRepository)
        : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(
            Command command,
            CancellationToken cancellationToken)
        {
            var city = await cityRepository.Get(command.Id) ?? throw new MyNotFoundException();

            city.Name = command.Name;

            await cityRepository.Update(city);
            return Unit.Value;
        }
    }
}