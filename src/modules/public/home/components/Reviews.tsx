'use client'

import { Box, Typography, Card, CardContent, Avatar } from '@mui/material'
import { Star as StarIcon, FormatQuote as QuoteIcon } from '@mui/icons-material'

const reviews = [
  {
    name: 'Maria Silva',
    avatar: 'M',
    rating: 5,
    comment:
      'Adorei o Presenteia! Criei minha lista de casamento e foi super fácil compartilhar com os convidados. Todos acharam muito prático!',
  },
  {
    name: 'João Santos',
    avatar: 'J',
    rating: 5,
    comment:
      'Usei para organizar o chá de bebê da minha esposa. A plataforma é intuitiva e ajudou muito na hora de escolher os presentes.',
  },
  {
    name: 'Ana Costa',
    avatar: 'A',
    rating: 5,
    comment:
      'Criei uma lista para meu aniversário e foi incrível! Meus amigos adoraram poder escolher os presentes que eu realmente queria.',
  },
  {
    name: 'Pedro Oliveira',
    avatar: 'P',
    rating: 4,
    comment:
      'Excelente ferramenta! Facilitou muito na organização da minha formatura. Recomendo para todos os tipos de eventos.',
  },
  {
    name: 'Carla Mendes',
    avatar: 'C',
    rating: 5,
    comment:
      'Simplesmente perfeito! Usei para a lista da casa nova e ficou tudo organizado. A melhor plataforma de listas que já usei.',
  },
  {
    name: 'Lucas Ferreira',
    avatar: 'L',
    rating: 5,
    comment:
      'Muito prático e fácil de usar. Criamos a lista de Natal da família e todos puderam participar de forma simples e divertida.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            fontSize: 20,
            color: index < rating ? '#FFC312' : 'rgba(0, 0, 0, 0.12)',
          }}
        />
      ))}
    </Box>
  )
}

export function Reviews() {
  return (
    <Box
      id="depoimentos"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
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
            Descubra por que as pessoas adoram o Presenteia
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
            Veja o que nossos usuários têm a dizer sobre suas experiências
          </Typography>
        </Box>

        {/* Grid de Reviews */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {reviews.map((review, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                position: 'relative',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  borderColor: 'primary.light',
                },
              }}
            >
              {/* Aspas de Abertura */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  zIndex: 1,
                }}
              >
                <QuoteIcon
                  sx={{
                    fontSize: 20,
                    color: 'primary.contrastText',
                    transform: 'scaleX(-1)',
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3, pt: 4 }}>
                {/* Comentário */}
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    mb: 3,
                    fontStyle: 'italic',
                    minHeight: { xs: 'auto', sm: '120px' },
                  }}
                >
                  {review.comment}
                </Typography>

                {/* Estrelas */}
                <Box sx={{ mb: 2 }}>
                  <StarRating rating={review.rating} />
                </Box>

                {/* Informações do Usuário */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 40,
                      height: 40,
                      fontWeight: 600,
                    }}
                  >
                    {review.avatar}
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.dark',
                    }}
                  >
                    {review.name}
                  </Typography>
                </Box>
              </CardContent>

              {/* Aspas de Fechamento */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  zIndex: 1,
                }}
              >
                <QuoteIcon
                  sx={{
                    fontSize: 20,
                    color: 'primary.main',
                  }}
                />
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
