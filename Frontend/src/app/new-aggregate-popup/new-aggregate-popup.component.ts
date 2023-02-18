import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ReportAggregate, ReportItem } from '../reports/report';
import { ReportService } from '../reports/report.service';
import { ValidatorsService } from '../validators/validators.service';

@Component({
  selector: 'app-new-aggregate-popup',
  templateUrl: './new-aggregate-popup.component.html',
  providers: [ReportService],
  styleUrls: ['./new-aggregate-popup.component.scss']
})
export class NewAggregatePopupComponent {

  protected reportAggregate: ReportAggregate;
  nameControl: FormControl;
  countyControl: FormControl;
  avgFireIndex: FormControl;
  maxFireIndex: FormControl;

  constructor(
    public dialogRef: MatDialogRef<EditPopupComponent>,
    private reportService: ReportService,
    private validatorService: ValidatorsService,
  ) {
    this.reportAggregate = new ReportAggregate();
    this.nameControl = new FormControl(this.reportAggregate.name);
    this.countyControl = new FormControl(this.reportAggregate.county);
    this.avgFireIndex = new FormControl(this.reportAggregate.avgFireIndex);
    this.maxFireIndex = new FormControl(this.reportAggregate.maxFireIndex);
  }

  // Creates new ReportItem locally
  createNewReport() {
    this.reportAggregate.reportList.push(new ReportItem())
  }

  // Validate and save if successful.
  onSaveClicked(): void {
    try {
      // Assemble result
      this.reportAggregate.name = this.nameControl.value;
      this.reportAggregate.county = this.countyControl.value;
      this.reportAggregate.avgFireIndex = parseInt(this.avgFireIndex.value);
      this.reportAggregate.maxFireIndex = parseInt(this.maxFireIndex.value);

      const validationResult = this.validatorService.validateReportAggregate(this.reportAggregate);
      if (Object.keys(validationResult).length == 0) {
        this.reportService.upsertReport(this.reportAggregate).subscribe();
        this.dialogRef.close();
      }
      else {
        this.validatorService.showReportAggregateErrors(validationResult);
      }
    }
    catch { }
  }

  // Deletes a ReportItem locally
  deleteReportCallback = (index: number) => {
    this.reportAggregate.reportList.splice(index, 1);
  }
}
