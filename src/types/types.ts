export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: number }

export interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface PaginationRequest extends Omit<Pagination, 'currentPage' | 'totalItems'> {
  page: number
}
