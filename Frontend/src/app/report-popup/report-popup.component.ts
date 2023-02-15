import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportAggregate } from '../reports/report';


@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.scss']
})
export class ReportPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ReportPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public reportAggregate: ReportAggregate) {
    console.log(reportAggregate.id);
  }

  onDeleteClicked(): void {
    this.dialogRef.close();
  }

  onEditClicked(): void {
    this.dialogRef.close();
  }
}
