export class ReportAggregate {
	name: string = "";
	county: string = "";
	avgFireIndex: number = 0;
	maxFireIndex: number = 0;
	id: number = 0;
	reportList: ReportItem[] = [];
  }

export class ReportItem {
	fireStartDate: string = new Date().toISOString();
	fireEndDate: string = new Date().toISOString();
	reportDate: string = new Date().toISOString();
	fireIndex: number = 0;
	hectares: number = 1;
}