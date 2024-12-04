namespace Weather.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(setup =>
        {
            // Fix for swagger bug for endpoints with name containing '+': (https://github.com/swagger-api/swagger-ui/issues/7911)
            setup.CustomSchemaIds(s => s.FullName?.Replace("+", "."));
        });

        return services;
    }
}