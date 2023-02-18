import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportAggregate } from 'src/app/reports/report'
import { ReportService } from 'src/app/reports/report.service'
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { NewAggregatePopupComponent } from '../new-aggregate-popup/new-aggregate-popup.component';


@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  providers: [ReportService],
  styleUrls: ['./report-table.component.scss']
})

export class ReportTableComponent implements OnInit {
  dataSource: ReportAggregate[] = [];
  displayedColumns: string[] = ['id', 'name', 'county', 'avgFireIndex', 'maxFireIndex', 'reports'];

  constructor(private reportService: ReportService, public dialog: MatDialog) { }


  getReportAggregates(): void {
    this.reportService.getReports().subscribe(result => {
      this.dataSource = result;
    });
  }

  newReport(): void {
    this.openCreateDialog(new ReportAggregate());
  }

  openCreateDialog(row: ReportAggregate): void {
    const dialogRef = this.dialog.open(NewAggregatePopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getReportAggregates();
    });
  }

  openEditDialog(row: ReportAggregate): void {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getReportAggregates();
    });
  }

  ngOnInit(): void {
    this.getReportAggregates();
  }
}
