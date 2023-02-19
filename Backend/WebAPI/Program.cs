using Domain.Services;
using LiteDB;
using API.Services;
using Infrastructure.Database;
using Domain.Entities;
using System.Security.Cryptography;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //DB Setup Context
            var db = new LiteDatabase(@"TestDatabase.db");
            IRepository<ReportAggregate> repository = new ReportAggregateRepository(db);

            // Seeding for testing
            if (repository.GetAll().Any() == false)
            {
                populateDatabase(repository);
            }

            // Add ReportAggregate service to scope.
            builder.Services.AddScoped<IReportService, ReportService>(f => new ReportService(repository));

            // Add services to the container.
            builder.Services.AddControllers();

            // Swagger disabled
            //builder.Services.AddEndpointsApiExplorer();
            //builder.Services.AddSwaggerGen();

            // Configure CORS to interact with Frontend.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Origins", policy =>
                {
                    policy
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            var app = builder.Build();
            app.UseCors("Origins");
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }

        private static void populateDatabase(IRepository<ReportAggregate> repository)
        {

            repository.Insert(
                new ReportAggregate(
                    "Cesar's Farm",
                    "Johnson County",
                    14,
                    26,
                    new List<ReportItem>(){
                    new ReportItem("2023-02-18T23:11:01.365Z",
                    "2022-11-10T03:00:00.000Z",
                    "2022-11-25T03:00:00.000Z",
                    26,
                    530
                    )}
                ));

            repository.Insert(
                new ReportAggregate(
                    "Green Forest",
                    "Morris County",
                    12,
                    13,
                    new List<ReportItem>()
                ));

            repository.Insert(
                new ReportAggregate(
                    "Lawrence",
                    "Leavenworth County",
                    18,
                    22 ,
                    new List<ReportItem>()
                    {
                    new ReportItem("2023-02-18T23:09:17.278Z",
                    "2018-06-20T04:00:00.000Z",
                    "2018-06-30T04:00:00.000Z",
                    15,
                    130
                    ),
                    new ReportItem("2023-02-18T23:09:49.137Z",
                    "2022-02-09T03:00:00.000Z",
                    "2022-11-25T03:00:00.000Z",
                    29,
                    630
                    )
                    }
                ));

            repository.Insert(
                new ReportAggregate(
                    "River Trail",
                    "Riley County",
                    5,
                    20,
                    new List<ReportItem>() {
                    new ReportItem("2023-02-18T23:10:11.971Z",
                    "2023-02-01T03:00:00.000Z",
                    "2023-02-09T03:00:00.000Z",
                    20,
                    30
                    )}
                ));

        }
    }

}
