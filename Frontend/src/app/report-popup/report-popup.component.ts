import { Component, Inject, Input } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportAggregate, ReportItem } from '../reports/report';
import { ReportService } from '../reports/report.service';


@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  providers: [ReportService],
  styleUrls: ['./report-popup.component.scss']
})
export class ReportPopupComponent {

  protected isEditing : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReportPopupComponent>,
    private reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public reportAggregate: ReportAggregate,
    ) {
  }

  // Creates new report locally
  createNewReport(){
    this.reportAggregate.reportList.push(new ReportItem())
  }

  // Deletes a ReportItem locally
  deleteReportCallback = (index: number) => {
    this.reportAggregate.reportList.splice(index,1);
  }

  // Close the window and call delete on the API
  onDeleteClicked(): void {
    this.reportService.deleteReport(this.reportAggregate.id).subscribe();
    this.dialogRef.close();
  }

  onEditClicked(): void {
    try{
    this.reportService.upsertReport(this.reportAggregate).subscribe();
    this.dialogRef.close();
    }
    catch{}
  }
}
