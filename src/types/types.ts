export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: number }

export interface Pagination {
  current: number
  total: number
  size: number
}
