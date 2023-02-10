using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class FireLocation : Entity
    {
        public string name { get; set; }
        public string county { get; set; }

        private List<FireReport> _fireReports;

        public FireLocation(string name, string county)
        {
            this.name = name;
            this.county = county;
            _fireReports = new List<FireReport>();
        }

        public void AddFireReport(DateTime date, DateTime start, DateTime end, int hectares)
        {
            //TODO: Business rules

            FireReport fireReport = new FireReport(date, start, end, hectares);
            _fireReports.Add(fireReport);
        }

    }
}
