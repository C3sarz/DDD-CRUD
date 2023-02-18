using Domain.Entities;
using FluentValidation;

namespace Infrastructure.Validators
{
    /// <summary>
    /// Validates properties of a ReportAggregate object.
    /// </summary>
    public class ReportAggregateValidator : AbstractValidator<ReportAggregate>
    {
        public ReportAggregateValidator()
        {
            RuleFor(x => x.Id)
                .NotNull();

            RuleFor(x => x.name)
                .NotNull()
                .Length(1, 30);

            RuleFor(x => x.county)
                .NotNull()
                .Length(1, 30);

            RuleFor(x => x.maxFireIndex)
                .NotNull()
                .InclusiveBetween(0, 30);

            RuleFor(x => x.avgFireIndex)
                .NotNull()
                .InclusiveBetween(0, 30);

            RuleForEach(x => x.reportList)
                .NotNull()
                .SetValidator(new ReportItemValidator());
        }
    }

}
