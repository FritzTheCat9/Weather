# Weather

Simple CRUD app using .NET Api and Angular

## Table of contents

* [Launch](#launch)
* [Presentation](#presentation)
* [Technologies](#technologies)
* [Architecture](#architecture)
* [Project types and references](#project-types-and-references)
* [Packages](#packages)
* [Features](#features)
* [Project status](#project-status)

## Launch

Run application with one command (setup all docker containers, create database, apply migrations):

```
cd C:\Users\bartl\source\repos\Weather\src\Weather.Api
docker compose up --build -d
```

Created containers:

- C# Web API backend:

```
http://localhost:5000
```

- MSSQL database:

```
Host: localhost 
Port: 1433 
Database/Schema: Weather
Username: sa
Password: Password1!
Server: weather.database
```

- Seq Api logs:

```
http://localhost:8081
```

## Presentation

## Technologies

- C# 13
- .NET 9.0
- Angular

## Architecture

## Project types and references

## Packages

## Features

- Cities
    - Create city
    - Delete city
    - Update city
    - Get all cities
    - Get city

## Project status
