'use client'

import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import {
  PlaylistAdd as CreateIcon,
  FavoriteBorder as WishIcon,
  Share as ShareIcon,
} from '@mui/icons-material'

const steps = [
  {
    icon: CreateIcon,
    number: '1',
    title: 'Crie uma lista',
    description: 'Comece criando sua lista de presentes para qualquer ocasião especial.',
  },
  {
    icon: WishIcon,
    number: '2',
    title: 'Adicione seus desejos',
    description: 'Adicione todos os presentes que você deseja ganhar com detalhes e links.',
  },
  {
    icon: ShareIcon,
    number: '3',
    title: 'Compartilhe com amigos',
    description: 'Compartilhe sua lista com amigos e familiares de forma fácil e rápida.',
  },
]

export function HowItWorks() {
  return (
    <Box
      id="como-funciona"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
        scrollMarginTop: '100px',
      }}
    >
      <Container maxWidth="lg">
        {/* Título e Descrição */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
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
            Como funciona?
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
            Criar e compartilhar sua lista de presentes é super simples e leva apenas alguns minutos
          </Typography>
        </Box>

        {/* Steps */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card
                key={index}
                elevation={0}
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Ícone */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 40,
                          color: 'primary.main',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Título */}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'primary.dark',
                      mb: 1.5,
                    }}
                  >
                    {step.title}
                  </Typography>

                  {/* Descrição */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
