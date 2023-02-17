import { Component, Input } from '@angular/core';
import { ReportItem } from '../reports/report';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent {

  protected isEditing: boolean = false;
  @Input() reportItem!: ReportItem ;



  trySave() {
    this.isEditing = false;
  }
}
