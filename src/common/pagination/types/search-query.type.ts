export type SearchParams<T> = {
  page?: number;
  limit?: number;
  sort?: keyof T;
  order: 'ASC' | 'DESC';
  search?: string;
  searchField?: Extract<keyof T, string>;
};
