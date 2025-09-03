export interface PaginationMetadata {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface PaginationResult<T> {
  data: T[];
  metadata: PaginationMetadata;
}
export class Pagination<T> implements PaginationResult<T> {
  data: T[];
  metadata: PaginationMetadata;
  constructor(data: T[], total: number, page: number, perPage: number) {
    console.log(data);
    const lastPage = Math.ceil(total / perPage);
    const metadata: PaginationMetadata = {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    };

    this.data = data;
    this.metadata = metadata;
  }
}
