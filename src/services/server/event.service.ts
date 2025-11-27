'use server';

import { apiFetch } from '@/configs/api/ssr-fetch';
import { Event } from '@/services/domain/event.types';
import { IFetchSuccessResponse } from '@/common/types/fetch.types';

export async function getEventBySlug(slug: string) {
  return await apiFetch<IFetchSuccessResponse<Event.IGetEventResponse>>(`/events/${slug}`, {
    method: 'GET',
    next: {
      tags: ['get-event-by-slug', slug],
    },  
    cache: 'no-cache',
  });
}
