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

            int avgIndex = RandomNumberGenerator.GetInt32(20);
            repository.Insert(
                new ReportAggregate(
                    "Cesar's Farm",
                    "Johnson County",
                    avgIndex,
                    avgIndex + RandomNumberGenerator.GetInt32(6),
                    new List<ReportItem>()
                ));

            avgIndex = RandomNumberGenerator.GetInt32(20);
            repository.Insert(
                new ReportAggregate(
                    "Green Forest",
                    "Morris County",
                    avgIndex,
                    avgIndex + RandomNumberGenerator.GetInt32(6),
                    new List<ReportItem>()
                ));

            avgIndex = RandomNumberGenerator.GetInt32(20);
            repository.Insert(
                new ReportAggregate(
                    "Lawrence",
                    "Leavenworth County",
                    avgIndex,
                    avgIndex + RandomNumberGenerator.GetInt32(6),
                    new List<ReportItem>()
                ));

            avgIndex = RandomNumberGenerator.GetInt32(20);
            repository.Insert(
                new ReportAggregate(
                    "River Trail",
                    "Riley County",
                    avgIndex,
                    avgIndex + RandomNumberGenerator.GetInt32(6),
                    new List<ReportItem>()
                ));

        }
    }

}
