'use server'

import { apiFetch } from '@/configs/api/ssr-fetch'
import { IFetchSuccessResponse } from '@/common/types/fetch.types'
import { IGetCategoriesResponse } from '@/services/domain/category.types'

export async function getCategories() {
  return await apiFetch<IFetchSuccessResponse<IGetCategoriesResponse>>(
    '/categories',
    {
      method: 'GET',
      cache: 'force-cache',
    },
    {
      page: 1,
      limit: 100,
      orderBy: 'name',
      sortBy: 'ASC',
    }
  )
}


