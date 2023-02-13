using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IReportService
    {

        public void CreateReport(Report report);
        public void UpdateReport(Report report);
        public void DeleteReport(int id);
        public Report GetReport(int id);
        public IEnumerable<Report> GetAllReports();


    }
}
