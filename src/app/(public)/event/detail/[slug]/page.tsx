import { handleApiError } from '@/configs/api/ssr-fetch';
import EventDetailPage from '@/modules/public/event/detail/page';
import { Event } from '@/services/domain/event.types';
import { Gift } from '@/services/domain/gift.types';
import { getEventBySlug } from '@/services/server/event.service';
import { getEventGiftCategory } from '@/services/server/gift.service';

interface IPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: IPageProps) {
  const resolvedParams = await params;

  // Buscar dados do evento
  const event = await getEventBySlug(resolvedParams.slug);
  const eventData = handleApiError<Event.IGetEventResponse>(event);

  // Buscar categorias (presentes serão buscados no cliente)
  const categoriesResponse = await getEventGiftCategory(eventData.id);
  const categories = handleApiError<Gift.IGetEventGiftCategoryResponse[]>(categoriesResponse);

  return <EventDetailPage data={eventData} categories={categories} />;
}
