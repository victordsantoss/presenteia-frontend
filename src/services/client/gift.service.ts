import { api } from '@/configs/api'
import { Gift } from '../domain/gift.types'

export const GiftService = {
  getGiftList: async (
    eventId: string,
    payload?: Partial<Gift.IGetGiftListRequest>
  ): Promise<Gift.IGetGiftListResponse> => {
    const { data } = await api.get(`/gifts/events/${eventId}`, {
      params: payload,
    })
    return data
  },
  reserveGift: async (
    giftId: string,
    payload: Gift.IReserveGiftRequest
  ): Promise<Gift.IReserveGiftResponse> => {
    const { data } = await api.post(`/reservations/gifts/${giftId}`, payload)
    return data
  },
  createGift: async (
    eventId: string,
    payload: Gift.ICreateGiftRequest
  ): Promise<Gift.ICreateGiftResponse> => {
    const formData = new FormData()
    formData.append('name', payload.name)
    if (payload.description) formData.append('description', payload.description)
    if (payload.price !== undefined) formData.append('price', String(payload.price))
    if (payload.quantity !== undefined) formData.append('quantity', String(payload.quantity))
    if (payload.categoryId) formData.append('categoryId', payload.categoryId)
    if (payload.priority) formData.append('priority', payload.priority)
    formData.append(
      'allowMultipleContributions',
      String(payload.allowMultipleContributions || false)
    )
    if (payload.links?.length) formData.append('links', JSON.stringify(payload.links))
    if (payload.image) formData.append('image', payload.image)

    const { data } = await api.post(`/gifts/events/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
}
