using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ReportItem : Entity
    {
        public string fireStartDate { get;  set; }
        public string fireEndDate { get;  set; }
        public string reportDate { get;  set; }

        public int fireIndex { get;  set; }
        public int hectares { get;  set; }

        public ReportItem(string reportDate, string start, string end, int fireIndex, int hectares)
        {
            this.hectares = hectares;
            this.fireIndex= fireIndex;
            this.reportDate = reportDate;
            this.fireStartDate = start;
            fireEndDate = end;
        }


    }
}
