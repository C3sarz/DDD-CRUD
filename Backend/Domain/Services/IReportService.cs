using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    /// <summary>
    /// Abstracts operationsof ReportAggregate to Application layer.
    /// </summary>
    public interface IReportService
    {
        public void CreateReport(ReportAggregate report);
        public bool UpdateReport(ReportAggregate report);
        public bool DeleteReport(int id);
        public ReportAggregate GetReport(int id);
        public IEnumerable<ReportAggregate> GetAllReports();
    }
}
