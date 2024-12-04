namespace Weather.Api.Exceptions;

public enum ExceptionType
{
    Validation = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Server = 500
}