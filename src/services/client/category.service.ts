import { api } from '@/configs/api'
import { IGetCategoriesResponse } from '../domain/category.types'

export const CategoryService = {
  getCategories: async (params?: {
    page?: number
    limit?: number
  }): Promise<IGetCategoriesResponse> => {
    const { data } = await api.get('/categories', {
      params: {
        page: 1,
        limit: 100,
        orderBy: 'name',
        sortBy: 'ASC',
        ...params,
      },
    })
    return data
  },
} 



