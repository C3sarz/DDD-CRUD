export interface Report {
	name: string;
	position: number;
	county: string;
	id: number;
	reportList: ReportItem[]
  }

export interface ReportItem {
	hectares: number
}