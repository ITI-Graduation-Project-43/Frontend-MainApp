export interface APIResponseVM {
  success: boolean;
  message: string;
  items: any[];
  pageNumber: number;
  itemsPerPage: number;
  totalPages: number;
}
