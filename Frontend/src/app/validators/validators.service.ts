import { Injectable } from '@angular/core';
import { Validator } from 'fluentvalidation-ts';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';
import { ReportAggregate, ReportItem } from '../reports/report';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService{

 reportAggregateValidator: ReportAggregateValidator;

  constructor() {
    this.reportAggregateValidator = new ReportAggregateValidator();
  }

  validateReportAggregate(report: ReportAggregate){
    var result = this.reportAggregateValidator.validate(report);
    return result;
  }

  validateReportItem(reportItem: ReportItem){
    var result = new ReportItemValidator().validate(reportItem);
    return result;
  }
}

class ReportAggregateValidator extends Validator<ReportAggregate> {

  constructor() {
    super();

    this.ruleFor('id')
    .notNull()
    .withMessage('ID null, item invalid.');

    this.ruleFor('name')
      .notEmpty()
      .notNull()
      .withMessage('Please enter a valid location name.');

    this.ruleFor('county')
      .notEmpty()
      .notNull()
      .withMessage('Please enter a valid county name.');

    this.ruleFor('avgFireIndex')
      .notNull()
      .inclusiveBetween(0, 30)
      .scalePrecision(0, 4)
      .withMessage('Please enter a valid FWI value.');

    this.ruleFor('maxFireIndex')
      .notNull()
      .inclusiveBetween(0, 30)
      .scalePrecision(0, 4)
      .withMessage('Please enter a valid FWI value.');

    this.ruleForEach('reportList')
    .notNull()
    .setValidator(() => new ReportItemValidator());
  }
}

class ReportItemValidator extends Validator<ReportItem> {

  constructor() {
    super();

    this.ruleFor('reportDate')
      .notEmpty()
      .notNull()
      .must(dateString => !Number.isNaN(Date.parse(dateString)))
      .withMessage('Please enter a valid date.');

      this.ruleFor('fireStartDate')
      .notEmpty()
      .notNull()
      .must(dateString => !Number.isNaN(Date.parse(dateString)))
      .withMessage('Please enter a valid date.');

      this.ruleFor('fireEndDate')
      .notEmpty()
      .notNull()
      .must(dateString => !Number.isNaN(Date.parse(dateString)))
      .withMessage('Please enter a valid date.');

    this.ruleFor('fireIndex')
      .notNull()
      .inclusiveBetween(0, 30)
      .scalePrecision(0, 4)
      .withMessage('Please enter a valid FWI value.');

    this.ruleFor('hectares')
      .notNull()
      .greaterThan(0)
      .scalePrecision(0, 8)
      .withMessage('Please enter a valid number of hectares.');
  }
}

