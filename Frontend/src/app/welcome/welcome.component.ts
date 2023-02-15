import { Component } from '@angular/core';
import { ReportPopupComponent } from '../report-popup/report-popup.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ReportAggregate } from '../reports/report';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  value:ReportAggregate = {name:'field1',county:'Jackson',reportList:[],id:2};
  constructor(public dialog: MatDialog) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(ReportPopupComponent, {
      data: this.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.value = result;
    });
  }

}
