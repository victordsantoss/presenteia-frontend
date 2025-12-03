export interface ICategoryItem {
  id: string
  name: string
}

export interface IGetCategoriesResponse {
  data: ICategoryItem[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
