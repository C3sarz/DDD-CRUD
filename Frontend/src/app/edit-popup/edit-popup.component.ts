import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportAggregate, ReportItem } from '../reports/report';
import { ReportService } from '../reports/report.service';
import { ValidatorsService } from '../validators/validators.service';



@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  providers: [ReportService],
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent {

  reportAggregate: ReportAggregate;
  nameControl: FormControl;
  countyControl: FormControl;
  avgFireIndex: FormControl;
  maxFireIndex: FormControl;

  constructor(
    public dialogRef: MatDialogRef<EditPopupComponent>,
    private reportService: ReportService,
    private validatorService: ValidatorsService,
    @Inject(MAT_DIALOG_DATA) private input: ReportAggregate,
  ) {
    this.reportAggregate = JSON.parse(JSON.stringify(input));
    this.nameControl = new FormControl(this.reportAggregate.name);
    this.countyControl = new FormControl(this.reportAggregate.county);
    this.avgFireIndex = new FormControl(this.reportAggregate.avgFireIndex);
    this.maxFireIndex = new FormControl(this.reportAggregate.maxFireIndex);
  }

  // Creates new ReportItem locally
  createNewReport() {
    this.reportAggregate.reportList.push(new ReportItem())
  }

  // Deletes a ReportItem locally
  deleteReportCallback = (index: number) => {
    this.reportAggregate.reportList.splice(index, 1);
  }

  // Close the window and call delete on the API
  onDeleteClicked(): void {
    this.reportService.deleteReport(this.reportAggregate.id).subscribe();
    this.dialogRef.close();
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
}
