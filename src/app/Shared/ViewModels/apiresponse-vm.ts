export interface APIResponseVM {
  success: boolean;
  message: string;
  items: any[];
  PageNumber: number;
  ItemsPerPage: number;
  TotalPages: number;
}
