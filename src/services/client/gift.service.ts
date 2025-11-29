import { api } from '@/configs/api';
import { Gift } from '../domain/gift.types';

export const GiftService = {
  getGiftList: async (
    eventId: string,
    payload?: Partial<Gift.IGetGiftListRequest>
  ): Promise<Gift.IGetGiftListResponse> => {
    const { data } = await api.get(`/gifts/events/${eventId}`, { 
      params: payload 
    });
    return data;
  },
  reserveGift: async (
    giftId: string,
    payload: Gift.IReserveGiftRequest
  ): Promise<Gift.IReserveGiftResponse> => {
    const { data } = await api.post(`/reservations/gifts/${giftId}`, payload);
    return data;
  },
};
