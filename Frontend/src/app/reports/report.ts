export interface ReportAggregate {
	name: string;
	county: string;
	avgFireIndex: number;
	maxFireIndex: number;
	id: number;
	reportList: ReportItem[];
  }

export interface ReportItem {
	fireStartDate: string;
	fireEndDate: string;
	reportDate: string;
	fireIndex: number;
	hectares: number;
}