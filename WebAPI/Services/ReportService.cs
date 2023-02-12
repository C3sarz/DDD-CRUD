using Domain.Entities;
using Domain.Services;

namespace API.Services
{
    public class ReportService : IReportService
    {
        private IRepository<Report> _repository;

        public ReportService(IRepository<Report> repository) { _repository = repository; }
        public void CreateReport(Report report) => _repository.Add(report);
        

        public void DeleteReport(Report report) => _repository.Delete(report);

        public IEnumerable<Report> GetAllReports() => _repository.GetAll();

        public Report GetReport(int Id) => _repository.GetById(Id);

        public void UpdateReport(Report report) => _repository.Update(report);
    }
}
