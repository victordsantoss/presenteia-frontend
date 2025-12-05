import { Box, Container, Typography } from '@mui/material'
import { Event } from '@/services/domain/event.types'
import { Gift } from '@/services/domain/gift.types'
import { Header } from './components/header'
import { Data } from './components/table/data'

interface IEventDetailPageProps {
  data: Event.IGetEventResponse
  categories: Gift.IGetEventGiftCategoryResponse[]
}

export default function EventDetailPage({ data, categories }: IEventDetailPageProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      <Header data={data} />

      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="xl">
          {/* Título */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                color: 'primary.dark',
                mb: 2,
              }}
            >
              Lista de Presentes
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'text.primary',
                lineHeight: 1.7,
              }}
            >
              Escolha um presente especial para contribuir
            </Typography>
          </Box>

          <Data eventId={data.id} categories={categories} />
        </Container>
      </Box>
    </Box>
  )
}
