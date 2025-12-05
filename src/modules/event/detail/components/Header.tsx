'use client'

import { Box, Container, Typography, Button, Stack, Chip, Card, CardContent } from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckIcon,
  Share as ShareIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material'
import { Event } from '@/services/domain/event.types'
import { formatDateAndTime } from '@/common/utils/date.util'

interface IHeaderProps {
  data: Event.IGetEventResponse
}

export function Header({ data }: IHeaderProps) {
  const isPublic = data.visibility === 'public'

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #006A9F 0%, #ffebd4 100%)',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        {/* Badge de visibilidade */}
        <Box sx={{ mb: 3 }}>
          <Chip
            icon={isPublic ? <PublicIcon /> : <LockIcon />}
            label={isPublic ? 'Evento Público' : 'Evento Privado'}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />
        </Box>

        {/* Título e Descrição */}
        <Box sx={{ mb: 6, maxWidth: '900px' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              mb: 3,
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
              opacity: 0.95,
              lineHeight: 1.6,
              maxWidth: '800px',
            }}
          >
            {data.description}
          </Typography>
        </Box>

        {/* Cards de Informação */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
          {/* Data e Hora */}
          <Card
            elevation={0}
            sx={{
              flex: 1,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CalendarIcon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Data e Hora
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {formatDateAndTime(new Date(data.eventDate))}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card
            elevation={0}
            sx={{
              flex: 1,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocationIcon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Localização
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {data.location}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Botões de Ação */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: '600px' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CheckIcon />}
            color="secondary"
            sx={{
              bgcolor: 'white',
              color: 'secondary.dark',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 6,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Confirmar Presença
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ShareIcon />}
            color="secondary"
            sx={{
              bgcolor: 'secondary.dark',
              borderColor: 'white',
              color: 'white',
              borderWidth: 2,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                borderWidth: 2,
                borderColor: 'white',
                bgcolor: 'secondary.light',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Compartilhar Evento
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
