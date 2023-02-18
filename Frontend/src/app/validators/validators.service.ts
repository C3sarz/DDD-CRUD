import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validator } from 'fluentvalidation-ts';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';
import { ReportAggregate, ReportItem } from '../reports/report';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  reportAggregateValidator: ReportAggregateValidator;

  constructor(private _snackBar: MatSnackBar) {
    this.reportAggregateValidator = new ReportAggregateValidator();

  }

  validateReportAggregate(report: ReportAggregate) {
    var result = this.reportAggregateValidator.validate(report);
    return result;
  }

  validateReportItem(reportItem: ReportItem) {
    var result = new ReportItemValidator().validate(reportItem);
    return result;
  }

  showReportAggregateErrors(errors: ValidationErrors<ReportAggregate>) {
    var message = 'Errors: ';
    Object.entries(errors).forEach(([key, value], index) => {
      message += `\n${key}: ${value}`
    });
    this._snackBar.open(message, '', { duration: 5000, panelClass: 'snackbar' })
  }

  showReportItemErrors(errors: ValidationErrors<ReportItem>) {
    var message = 'Errors: ';
    Object.entries(errors).forEach(([key, value], index) => {
      message += `\n${key}: ${value}`
    });
    this._snackBar.open(message, '', { duration: 5000, panelClass: 'snackbar' })
  }
}

class ReportAggregateValidator extends Validator<ReportAggregate> {

  constructor() {
    super();

    this.ruleFor('id')
      .notNull()
      .withMessage('ID null, item invalid.');

    this.ruleFor('name')
      .notNull()
      .length(1, 30)
      .withMessage('Please enter a valid location name.');

    this.ruleFor('county')
      .notNull()
      .length(1, 30)
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
      .setValidator(() => new ReportItemValidator())
    // .withMessage('\nInvalid report');
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

