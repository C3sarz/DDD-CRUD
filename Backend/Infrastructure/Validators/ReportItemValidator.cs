using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Validators
{
    /// <summary>
    /// Validates properties of a ReportItem object.
    /// </summary>
    public class ReportItemValidator : AbstractValidator<ReportItem>
    {
        public ReportItemValidator()
        {
            RuleFor(x => x.Id)
                .NotNull();

            RuleFor(x => x.fireStartDate)
                .NotNull()
                .Length(0, 20);

            RuleFor(x => x.fireEndDate)
                .Length(0, 20);

            RuleFor(x => x.reportDate)
                .NotNull()
                .Length(0, 20);

            RuleFor(x => x.fireIndex)
                .NotNull()
                .InclusiveBetween(0, 30);

            RuleFor(x => x.hectares)
                .NotNull()
                .GreaterThan(0);
        }
    }
}
