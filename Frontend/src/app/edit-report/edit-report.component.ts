import { Component, Input, OnInit } from '@angular/core';
import { ReportItem } from '../reports/report';
import {  FormControl } from '@angular/forms';
import { ValidatorsService } from '../validators/validators.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent {

  @Input() reportItem!: ReportItem;
  protected isEditing: boolean = false;
  protected newReportItem!: ReportItem;
  protected validationResult!: ValidationErrors<ReportItem>;
  pipe = new DatePipe('en-US');


  fireIndexFormControl: FormControl = new FormControl();
  hectaresFormControl: FormControl = new  FormControl();

  constructor(
    private validatorService: ValidatorsService,
  ) { }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type == 'fireStartDate') {
      this.newReportItem.fireStartDate = event.value?.toISOString() ?? new Date().toISOString();

    }
    else if (type == 'fireEndDate') {
      this.newReportItem.fireEndDate = event.value?.toISOString() ?? new Date().toISOString();
      
    }
  }

  getFormattedDate(dateString: string): string {
    try{
    return this.pipe.transform(dateString, 'mediumDate')!;
    }
    catch{
      return 'invalid date'
    }
  }

  ngOnInit() {
    this.validationResult = this.validatorService.validateReportItem(this.reportItem);
    console.log(this.validationResult);
  }

  onStartEdit() {

    // Clone old report
    this.newReportItem = JSON.parse(JSON.stringify(this.reportItem));
    this.fireIndexFormControl.setValue(this.newReportItem?.fireIndex);
    this.hectaresFormControl.setValue(this.newReportItem?.hectares);
    this.isEditing = true;
  }

  trySave() {

    // Replace with new values
    this.newReportItem = {
      fireIndex: parseInt(this.fireIndexFormControl.value),
      hectares: parseInt(this.hectaresFormControl.value),
      fireStartDate: this.newReportItem.fireStartDate,
      fireEndDate: this.newReportItem.fireEndDate,
      reportDate: new Date().toISOString(),
    }

    // Validate and save
    this.validationResult = this.validatorService.validateReportItem(this.newReportItem);
    if (Object.keys(this.validationResult).length == 0) {
      this.isEditing = false;

      // Save by reference (probably not the best way to do it, but I havent used Angular enough)
      this.reportItem.reportDate = this.newReportItem.reportDate;
      this.reportItem.fireStartDate = this.newReportItem.fireStartDate;
      this.reportItem.fireEndDate = this.newReportItem.fireEndDate;
      this.reportItem.hectares = this.newReportItem.hectares;
      this.reportItem.fireIndex = this.newReportItem.fireIndex;
    }
    else {
      console.log(this.newReportItem);
      console.warn(this.validationResult);
    }
  }


}
