import { config } from './config';

export interface PageData {
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export const initialPageData = (): PageData => ({
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: config.pageSize,
  number: 0,
  empty: false,
});

export interface Pageable<T> {
  content: Array<T>;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
