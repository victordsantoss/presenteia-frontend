export interface IPaginatedResponse<T> {
  data: T[]
  meta: {
    limit: number
    page: number
    total: number
    totalPages: number
  }
}

export interface IPaginatedRequest {
  limit: number
  page: number
  orderBy?: string
  sortBy?: 'ASC' | 'DESC'
  search?: string
  [key: string]: unknown
}
