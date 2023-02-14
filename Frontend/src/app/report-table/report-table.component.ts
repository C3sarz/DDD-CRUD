import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/reports/report'
import { ReportService } from 'src/app/reports/report.service'




const ELEMENT_DATA: Report[] = [
  {position: 1, name: 'Hydrogen', id: 1.0079, county: 'H',reportList:[]},
  {position: 2, name: 'Helium', id: 4.0026, county: 'He',reportList:[]},
  {position: 3, name: 'Lithium', id: 6.941, county: 'Li',reportList:[]},
];

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  providers: [ReportService],
  styleUrls: ['./report-table.component.scss']
})

export class ReportTableComponent implements OnInit {
  dataSource: Report[] = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'county', 'id', 'reports'];
  clickedRows = new Set<Report>();

  constructor(private reportService: ReportService){}


  getReports(): void{
  this.reportService.getReports().subscribe(dataSource => this.dataSource = dataSource);
  console.log(this.dataSource.toString());
  
  }

  ngOnInit(): void {
    this.getReports();
  }
}
