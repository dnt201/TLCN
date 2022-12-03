export interface iPage {
  size: number;
  pageNumber: number;
  totalElement: number;
  order: [];
  changePageNumber: (number: number) => void;
}
