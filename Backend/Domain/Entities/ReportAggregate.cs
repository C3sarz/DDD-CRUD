using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ReportAggregate : Entity
    {
        public string name { get;  set; }
        public string county { get; set; }

        public int avgFireIndex { get; set; }

        public int maxFireIndex { get; set; }

        public List<ReportItem> reportList { get; private set; }

        public ReportAggregate(string name, string county, int avgFireIndex, int maxFireIndex)
        {
            this.name = name;
            this.county = county;
            this.avgFireIndex = avgFireIndex;
            this.maxFireIndex = maxFireIndex;
            reportList = new List<ReportItem>();
        }

        public void AddFireReport(string date, string start, string end, int fireIndex, int hectares)
        {
            //TODO: Business rules

            ReportItem report = new ReportItem(date, start, end, fireIndex, hectares);
            reportList.Add(report);
        }

    }
}
