import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportAggregate, ReportItem } from '../reports/report';


@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.scss']
})
export class ReportPopupComponent {

  protected isEditing : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReportPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public reportAggregate: ReportAggregate) {
  }

  createNewReport(){
    this.reportAggregate.reportList.push(new ReportItem())
  }

  deleteReportCallback = (index: number) => {
    this.reportAggregate.reportList.splice(index,1);
  }

  onDeleteClicked(): void {
    this.dialogRef.close();
  }

  onEditClicked(): void {
    this.dialogRef.close();
  }
}
