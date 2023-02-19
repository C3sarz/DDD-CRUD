# CRUD-Dev

Basic CRUD Frontend and Backend, developed as an interview task for Hahn Softwareentwicklung.

## Startup

**__In order to run the example, please type ```docker compose up --build``` in the root directory of the repository (```/DDD-CRUD```).__**
**__Please then navigate to [Angular application](http://localhost:4200/) (```http://localhost:4200```) to access the Angular Front-end application.__**

To recreate the image with the testing values in the database, please use ```docker compose up --force-recreate```.

## Task

1. Develop a WebApi based on a DDD Pattern in .Net6
2. Develop a Angular CRUD Application to maintain the data with validation in front and backend ( use FluentValidation Syntax in Both)
3. The Angular Application also should have a overview with an grid
4. The Application should be startable with a docker-compose and checkable

In order to make the project more entertaining, I decided to make it about a forest fire reporting service, where users can view and submit reports (ReportItem) regarding forest fires on specific locations in a county (ReportAggregate).

## Entities and value objects

- There is one entity: the ReportAggregate, which contains details about the location, and county, where the fires were reported. It also contains a list of the reports themselves, and some basic fire index statistics.
- The value object is the ReportItem, which repesents an individual report contained inside a ReportAggregate object.

# Back-end

For the Web API infrastructure I used .NET 6, implementing the Domain-driven design pattern using "clean" architecture.
The API is divided into 3 different layers:
- Application layer (WebAPI folder)
- Domain layer
- Infrastructure layer

Overview of the interaction between layers:
![Architecture helper image](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/media/ddd-oriented-microservice/ddd-service-layer-dependencies.png)

Relevant details:
- Used **LiteDB** as the database for this project due to its ease of use and very low overhead, which I implemented utilizing the **repository pattern**.
- Implemented the IReportService, which controls the repositories and the validation of the ReportAggregate Entities.
- Used FluentValidation for validation, located inside the infrastructure layer.

# Front-end

The frontend is rather crude since I did not have much experience with browser-based frameworks like Angular.
It consists of:
- A Material-based design with Material widgets (kudos to Google).
- A main table that lists all ReportAggregates and their properties.
- The ability to create, update, and delete ReportAggregates and their respective ReportItems.



