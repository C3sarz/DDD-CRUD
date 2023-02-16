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

            //DB Context
            var db = new LiteDatabase(@".\database.db");
            IRepository<ReportAggregate> repository = new ReportRepository(db);

            // Seeding for testing
            repository.DeleteAll();
            if (repository.GetAll().Any() == false)
            {
                for (int i = 0; i < 5; i++)
                {
                    int fireIndex = RandomNumberGenerator.GetInt32(30);
                    repository.Add(
                        new ReportAggregate(
                            "cesar",
                        RandomNumberGenerator.GetInt32(3000).ToString(),
                        fireIndex,
                        fireIndex+ RandomNumberGenerator.GetInt32(6)
                        ));
                }
            }

            builder.Services.AddScoped<IReportService, ReportService>(f => new ReportService(repository));


            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            //builder.Services.AddEndpointsApiExplorer();
            //builder.Services.AddSwaggerGen();

            // Since angular runs on another port...
            builder.Services.AddCors(options =>
            {

                options.AddPolicy("Origins", policy =>
        {
        policy.WithOrigins("http://localhost:4200")
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
    }
}
