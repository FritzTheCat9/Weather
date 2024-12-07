using Weather.Api.Data.Database;
using Weather.Api.Exceptions;
using Weather.Api.Extensions;
using Weather.Api.Logging;
using Weather.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddSwagger()
    .AddMyCors(builder.Configuration)
    .AddMediatr()
    .AddDatabase(builder.Configuration)
    .AddExceptionMiddleware()
    .AddMyLogging(builder.Configuration)
    .AddServices()
    .AddHttpContextAccessor();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "weather.api");
        options.RoutePrefix = string.Empty;
    });
}

app.UseExceptionMiddleware()
    .AddEndpoints()
    .UseMyCors();

app.Run();