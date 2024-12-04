using MediatR;
using Weather.Api.Data.Database;

namespace Weather.Api.Behaviors;

public class UnitOfWorkBehavior<TRequest, TResponse>(
    AppDbContext dbContext,
    ILogger<UnitOfWorkBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
{
    private static bool IsNotCommand => !typeof(TRequest).Name.EndsWith("Command");

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (IsNotCommand)
        {
            return await next();
        }

        logger.LogInformation("[UnitOfWork] Begin Transaction");

        await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var response = await next();
            await dbContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            logger.LogInformation("[UnitOfWork] Commited Transaction");

            return response;
        }
        catch (Exception exception)
        {
            logger.LogError("[UnitOfWork] Rollback Transaction {Exception}", exception);

            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }
}