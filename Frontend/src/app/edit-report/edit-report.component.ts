import { Component, Input, OnInit } from '@angular/core';
import { ReportItem } from '../reports/report';
import { FormControl } from '@angular/forms';
import { ValidatorsService } from '../validators/validators.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent {

  @Input() reportItem!: ReportItem;
  @Input() reportIndex!: number;
  @Input() deleteCallback!: (index: number) => void;
  protected isEditing: boolean = false;
  protected newReportItem!: ReportItem;
  pipe = new DatePipe('en-US');


  fireIndexFormControl: FormControl = new FormControl();
  hectaresFormControl: FormControl = new FormControl();
  fireStartDateControl: FormControl = new FormControl();
  fireEndDateControl: FormControl = new FormControl();

  constructor(
    private validatorService: ValidatorsService,
  ) { }

  getFormattedDate(dateString: string, format: string | undefined): string {
    try {
      return this.pipe.transform(dateString, format ?? 'mediumDate')!;
    }
    catch {
      return 'invalid date'
    }
  }

  ngOnInit() {
  }

  onStartEdit() {

    // Clone old report
    this.newReportItem = JSON.parse(JSON.stringify(this.reportItem));
    this.fireIndexFormControl.setValue(this.newReportItem?.fireIndex);
    this.hectaresFormControl.setValue(this.newReportItem?.hectares);
    this.fireStartDateControl.setValue(new Date(this.newReportItem.fireStartDate));
    this.fireEndDateControl.setValue(new Date(this.newReportItem.fireEndDate));
    this.isEditing = true;
  }

  trySave() {
    // Replace with new values
    this.newReportItem = {
      fireIndex: parseInt(this.fireIndexFormControl.value),
      hectares: parseInt(this.hectaresFormControl.value),
      fireStartDate: this.fireStartDateControl.value.toISOString(),
      fireEndDate: this.fireEndDateControl.value.toISOString(),
      reportDate: new Date().toISOString(),
    }

    // Validate and save
    const validationResult = this.validatorService.validateReportItem(this.newReportItem);
    if (Object.keys(validationResult).length == 0) {
      this.isEditing = false;

      // Save by reference (probably not the best way to do it, but I havent used Angular enough)
      this.reportItem.reportDate = this.newReportItem.reportDate;
      this.reportItem.fireStartDate = this.newReportItem.fireStartDate;
      this.reportItem.fireEndDate = this.newReportItem.fireEndDate;
      this.reportItem.hectares = this.newReportItem.hectares;
      this.reportItem.fireIndex = this.newReportItem.fireIndex;
    }
    else {
      this.validatorService.showReportItemErrors(validationResult);
      console.warn(validationResult);
    }
  }


}
