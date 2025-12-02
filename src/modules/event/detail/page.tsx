import { Box } from '@mui/material'
import { Event } from '@/services/domain/event.types'
import { Gift } from '@/services/domain/gift.types'
import { Header } from './components/Header'
import { GiftList } from './components/GiftList'

interface EventDetailPageProps {
  data: Event.IGetEventResponse
  categories: Gift.IGetEventGiftCategoryResponse[]
}

export default function EventDetailPage({ data, categories }: EventDetailPageProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      <Header data={data} />
      <GiftList eventId={data.id} categories={categories} />
    </Box>
  )
}
