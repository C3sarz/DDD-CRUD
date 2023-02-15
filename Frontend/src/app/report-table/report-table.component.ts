import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportAggregate } from 'src/app/reports/report'
import { ReportService } from 'src/app/reports/report.service'
import { ReportPopupComponent } from '../report-popup/report-popup.component';


@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  providers: [ReportService],
  styleUrls: ['./report-table.component.scss']
})

export class ReportTableComponent implements OnInit {
  dataSource: ReportAggregate[] = [];
  displayedColumns: string[] = ['id', 'name', 'county', 'reports'];
  clickedRows = new Set<ReportAggregate>();

  constructor(private reportService: ReportService, public dialog: MatDialog) { }


  getReports(): void {
    this.reportService.getReports().subscribe(dataSource => {
      dataSource.forEach(element => {

        console.log("DATA: " + element.id + ', ' + element.county);
      });

      this.dataSource = dataSource
    });
  }

  openDialog(row:ReportAggregate): void {
    const dialogRef = this.dialog.open(ReportPopupComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: '+result);
      // this.value = result;
    });
  }



  ngOnInit(): void {
    this.getReports();
  }
}
