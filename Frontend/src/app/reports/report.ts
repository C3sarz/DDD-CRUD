export interface ReportAggregate {
	name: string;
	county: string;
	id: number;
	reportList: ReportItem[]
  }

export interface ReportItem {
	hectares: number
}