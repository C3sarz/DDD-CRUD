using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Report : Entity
    {
        public string name { get;  set; }
        public string county { get; set; }

        public List<ReportItem> reportList { get; private set; }

        public Report(string name, string county)
        {
            this.name = name;
            this.county = county;
            reportList = new List<ReportItem>();
        }

        public void AddFireReport(DateTime date, DateTime start, DateTime end, int hectares)
        {
            //TODO: Business rules

            ReportItem report = new ReportItem(date, start, end, hectares);
            reportList.Add(report);
        }

    }
}
