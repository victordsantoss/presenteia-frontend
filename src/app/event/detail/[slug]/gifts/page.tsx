import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { handleApiError } from '@/configs/api/ssr-fetch'
import CreateGiftPage from '@/modules/event/gifts/page'
import { Event } from '@/services/domain/event.types'
import { getEventBySlug } from '@/services/server/event.service'

interface IPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: IPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const event = await getEventBySlug(resolvedParams.slug)
  const eventData = handleApiError<Event.IGetEventResponse>(event)

  return {
    title: `Adicionar Presente - ${eventData.title} | Presenteia`,
    description: `Adicione um novo presente à lista do evento ${eventData.title}`,
  }
}

export default async function Page({ params }: IPageProps) {
  const resolvedParams = await params

  // Verificar autenticação
  const cookieStore = await cookies()
  const _authToken = cookieStore.get('AUTH_TOKEN')

  //   if (!authToken) {
  //     // Usuário não está autenticado, redirecionar para login
  //     redirect(`/login?redirect=/event/detail/${resolvedParams.slug}/gifts`)
  //   }

  // Buscar dados do evento
  const event = await getEventBySlug(resolvedParams.slug)
  const eventData = handleApiError<Event.IGetEventResponse>(event)

  // TODO: Verificar se o usuário logado é o organizador do evento
  // Isso requer decodificar o token JWT ou fazer uma chamada à API
  // Por enquanto, assumimos que a API retornará erro 403 se o usuário não for autorizado

  return (
    <CreateGiftPage
      eventId={eventData.id}
      eventSlug={eventData.slug}
      eventTitle={eventData.title}
    />
  )
}
