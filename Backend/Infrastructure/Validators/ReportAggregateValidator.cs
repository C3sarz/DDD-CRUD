using Domain.Entities;
using FluentValidation;

namespace Infrastructure.Validators
{
    public class ReportAggregateValidator : AbstractValidator<ReportAggregate>
    {
        public ReportAggregateValidator()
        {
            RuleFor(x => x.Id)
                .NotNull()
                .NotEqual(0);

            RuleFor(x => x.name)
                .NotNull()
                .Length(0, 20);

            RuleFor(x => x.county)
                .NotNull()
                .Length(0, 20);

            RuleFor(x => x.maxFireIndex)
                .InclusiveBetween(0, 30);

            RuleFor(x => x.avgFireIndex)
                .InclusiveBetween(0, 30);

            RuleForEach(x => x.reportList)
                .NotNull()
                .SetValidator(new ReportItemValidator());
        }
    }

}
