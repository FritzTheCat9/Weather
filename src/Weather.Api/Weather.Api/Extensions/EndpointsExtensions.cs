using Weather.Api.Features.Cities.Extensions;

namespace Weather.Api.Extensions
{
    public static class EndpointsExtensions
    {
        public static WebApplication AddEndpoints(this WebApplication app)
        {
            app.AddCitiesEndpoints();

            return app;
        }
    }
}
