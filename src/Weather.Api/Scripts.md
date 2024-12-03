﻿## Entity Framework Core Migrations

Remember to change ***MIGRATION_NAME***

``` 
cd C:\Users\bartl\source\repos\Weather\src\Weather.Api\Weather.Api
dotnet ef migrations add MIGRATION_NAME -o ./Data/Migrations --startup-project ../Weather.Api
dotnet ef database update
```