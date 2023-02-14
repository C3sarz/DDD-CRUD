import { Component } from '@angular/core';

export interface Report {
  name: string;
  position: number;
  county: string;
  id: number;
}

const ELEMENT_DATA: Report[] = [
  {position: 1, name: 'Hydrogen', id: 1.0079, county: 'H'},
  {position: 2, name: 'Helium', id: 4.0026, county: 'He'},
  {position: 3, name: 'Lithium', id: 6.941, county: 'Li'},
];

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})

export class ReportTableComponent {
  displayedColumns: string[] = ['position', 'name', 'county', 'id'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<Report>();
}
