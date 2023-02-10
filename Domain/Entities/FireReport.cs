using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class FireReport : Entity
    {
        public DateTime fireStartDate { get; set; }
        public DateTime fireEndDate { get; set; }
        public DateTime reportDate { get; set; }
        public int hectares { get; set; }

        public FireReport(DateTime reportDate, DateTime start, DateTime end, int hectares)
        {
            this.hectares = hectares;
            this.reportDate = reportDate;
            fireStartDate = start;
            fireEndDate = end;
        }


    }
}
