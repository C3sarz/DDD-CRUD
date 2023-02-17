using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    /// <summary>
    /// Aggregate of Fire Reports corresponding to a certain
    ///  location name, in a certain county.
    /// </summary>
    public class ReportAggregate : Entity
    {
        public string name { get; set; }
        public string county { get; set; }

        public int avgFireIndex { get; set; }

        public int maxFireIndex { get; set; }

        public List<ReportItem> reportList { get; set; }

        public ReportAggregate(string name, string county, int avgFireIndex, int maxFireIndex, List<ReportItem> reportList)
        {
            this.name = name;
            this.county = county;
            this.avgFireIndex = avgFireIndex;
            this.maxFireIndex = maxFireIndex;
            this.reportList = reportList;
        }

        /// <summary>
        /// To be used by the de-serializer
        /// </summary>
        public ReportAggregate() { }

    }
}
