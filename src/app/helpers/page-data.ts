export interface PageData {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export const initialPageData = (): PageData => ({
  size: 0,
  totalElements: 0,
  totalPages: 0,
  number: 0,
});
