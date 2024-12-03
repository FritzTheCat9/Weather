using FluentValidation;
using MediatR;
using Weather.Api.Data.Repositories;
using Weather.Api.Exceptions;
using Weather.Api.Helpers;

namespace Weather.Api.Features.Cities.Commands
{
    public static class DeleteCityFeature
    {
        public class Command : IRequest<Unit>
        {
            public int Id { get; init; }
        }

        public class Validator : AbstractValidator<Command> { }

        public static void Endpoint(this IEndpointRouteBuilder app)
        {
            app.MapDelete("/api/cities/{id:int}", async (
                    int id,
                    IMediator mediator,
                    CancellationToken cancellationToken) =>
            {
                var command = new Command { Id = id };
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

                await cityRepository.Delete(city);
                return Unit.Value;
            }
        }
    }
}
