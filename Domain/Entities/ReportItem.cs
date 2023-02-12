using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ReportItem : Entity
    {
        public DateTime fireStartDate { get; private set; }
        public DateTime fireEndDate { get; private set; }
        public DateTime reportDate { get; private set; }
        public int hectares { get; private set; }

        public ReportItem(DateTime reportDate, DateTime start, DateTime end, int hectares)
        {
            this.hectares = hectares;
            this.reportDate = reportDate;
            fireStartDate = start;
            fireEndDate = end;
        }


    }
}
