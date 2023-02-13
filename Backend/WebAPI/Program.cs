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
            IRepository<Report> repository = new ReportRepository(db);
            repository.DeleteAll();
            for (int i = 0; i < 5; i++)
            {
                repository.Add(new Report("cesar", RandomNumberGenerator.GetInt32(3000).ToString()));
            }
            builder.Services.AddScoped<IReportService, ReportService>(f => new ReportService(repository));



            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            //builder.Services.AddEndpointsApiExplorer();
            //builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}