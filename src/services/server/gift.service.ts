'use server'

import { apiFetch } from '@/configs/api/ssr-fetch'

import { IFetchSuccessResponse } from '@/common/types/fetch.types'
import { Gift } from '../domain/gift.types'

export async function getEventGiftCategory(eventId: string) {
  return await apiFetch<IFetchSuccessResponse<Gift.IGetEventGiftCategoryResponse[]>>(
    `/gifts/events/${eventId}/categories`,
    {
      method: 'GET',
      next: {
        tags: ['get-event-gift-category', eventId],
      },
      cache: 'no-cache',
    }
  )
}

export async function getGiftList(eventId: string) {
  return await apiFetch<IFetchSuccessResponse<Gift.IGetGiftListResponse>>(
    `/gifts/events/${eventId}`,
    {
      method: 'GET',
      next: {
        tags: ['get-gift-list', eventId],
      },
      cache: 'no-cache',
    }
  )
}
