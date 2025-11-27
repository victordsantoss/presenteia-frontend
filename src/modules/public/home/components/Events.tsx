'use client'

import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material'
import {
  Celebration as CelebrationIcon,
  Cake as BirthdayIcon,
  CardGiftcard as ChristmasIcon,
  Home as HomeIcon,
  Favorite as WeddingIcon,
  ChildCare as BabyIcon,
  School as GraduationIcon,
  WorkspacePremium as AnniversaryIcon,
} from '@mui/icons-material'
import Link from 'next/link'

const events = [
  {
    icon: BirthdayIcon,
    title: 'Aniversário',
    description: 'Celebre seu dia especial com uma lista de presentes personalizada.',
    color: '#FF6B9D',
  },
  {
    icon: ChristmasIcon,
    title: 'Natal',
    description: 'Organize sua lista de Natal e facilite a troca de presentes.',
    color: '#FF4757',
  },
  {
    icon: WeddingIcon,
    title: 'Casamento',
    description: 'Monte sua lista de casamento e compartilhe com convidados.',
    color: '#FFC312',
  },
  {
    icon: BabyIcon,
    title: 'Chá de Bebê',
    description: 'Prepare-se para a chegada do bebê com uma lista completa.',
    color: '#70A1FF',
  },
  {
    icon: HomeIcon,
    title: 'Casa Nova',
    description: 'Lista de presentes para mobiliar e decorar sua nova casa.',
    color: '#2ED573',
  },
  {
    icon: GraduationIcon,
    title: 'Formatura',
    description: 'Comemore sua conquista com presentes especiais.',
    color: '#5F27CD',
  },
  {
    icon: AnniversaryIcon,
    title: 'Aniversário de Namoro',
    description: 'Celebre momentos especiais do relacionamento.',
    color: '#FF6348',
  },
  {
    icon: CelebrationIcon,
    title: 'Outras Ocasiões',
    description: 'Crie listas para qualquer evento ou celebração especial.',
    color: '#48DBFB',
  },
]

export function Events() {
  return (
    <Box
      id="eventos"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
        overflow: 'hidden',
        scrollMarginTop: '100px',
      }}
    >
      <Box sx={{ px: { xs: 2, md: 4 } }}>
        {/* Título */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            maxWidth: '700px',
            mx: 'auto',
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
            Para todas as ocasiões
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
            Crie listas personalizadas para cada momento especial da sua vida
          </Typography>
        </Box>

        {/* Carrossel de Cards */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            p: 2,
            px: { xs: 0, sm: 2 },
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'rgba(0,0,0,0.05)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.light',
              borderRadius: 4,
              '&:hover': {
                bgcolor: 'primary.main',
              },
            },
          }}
        >
          {events.map((event, index) => {
            const IconComponent = event.icon
            return (
              <Card
                key={index}
                elevation={0}
                sx={{
                  minWidth: { xs: 280, sm: 320 },
                  maxWidth: 320,
                  scrollSnapAlign: 'start',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                    borderColor: event.color,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Ícone */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        bgcolor: `${event.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 36,
                          color: event.color,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Título */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: 'primary.dark',
                      mb: 1,
                      textAlign: 'center',
                    }}
                  >
                    {event.title}
                  </Typography>

                  {/* Descrição */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      mb: 3,
                      flexGrow: 1,
                      fontSize: '0.9rem',
                    }}
                  >
                    {event.description}
                  </Typography>

                  {/* Botão */}
                  <Button
                    component={Link}
                    href="/criar-lista"
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      borderWidth: 2,
                    }}
                  >
                    Criar lista
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </Box>

        {/* Dica de Scroll (Mobile) */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            ← Deslize para ver mais →
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
