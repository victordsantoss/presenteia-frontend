'use client'

import { Box, Typography, Button, Container } from '@mui/material'
import { CardGiftcard as GiftIcon, Add as AddIcon } from '@mui/icons-material'
import { DisabledTooltip } from '@/components/disabled-tooltip'
import { DecorativeCircle } from '@/components/decorative-circle'

export function GiftList() {
  return (
    <Box
      id="criar-lista"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '100px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Ícone Decorativo */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <GiftIcon
              sx={{
                fontSize: 40,
                color: 'primary.contrastText',
              }}
            />
          </Box>

          {/* Título Principal */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: 'text.primary',
              mb: 1,
              lineHeight: 1.2,
            }}
          >
            Pronto para começar sua lista?
          </Typography>
          {/* Descrição */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'text.primary',
              lineHeight: 1.8,
              maxWidth: '600px',
              mb: 2,
            }}
          >
            Crie sua lista em minutos, compartilhe com quem você ama e receba exatamente o que
            deseja. É simples, rápido e totalmente gratuito.
          </Typography>

          {/* CTA Button */}
          <DisabledTooltip title="Em breve!">
            <Button
              component="button"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.dark',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 3,
                boxShadow: 4,
                mt: 2,
                '&:hover': {
                  bgcolor: 'primary.contrastText',
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s',
                },
              }}
            >
              Criar minha lista agora
            </Button>
          </DisabledTooltip>

          {/* Badge Adicional */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              ✨ Grátis • Rápido • Sem complicação
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Círculos Decorativos */}
      <DecorativeCircle
        size="400px"
        bottom="-10%"
        left="-5%"
        color="primary.light"
        opacity={0.3}
        hideBelow="md"
      />
      <DecorativeCircle
        size="200px"
        top="15%"
        left="5%"
        color="primary.main"
        opacity={0.15}
        hideBelow="lg"
      />
      <DecorativeCircle
        size="150px"
        top="40%"
        right="10%"
        color="primary.light"
        opacity={0.4}
        hideBelow="md"
      />
      <DecorativeCircle
        size="250px"
        bottom="20%"
        right="15%"
        color="primary.main"
        opacity={0.1}
        hideBelow="lg"
      />
      <DecorativeCircle
        size="120px"
        top="5%"
        left="45%"
        color="primary.light"
        opacity={0.5}
        hideBelow="md"
      />
      <DecorativeCircle
        size="100px"
        bottom="35%"
        left="8%"
        color="primary.main"
        opacity={0.2}
        hideBelow="xl"
      />
      <DecorativeCircle
        size="180px"
        top="8%"
        right="5%"
        color="primary.light"
        opacity={0.25}
        hideBelow="lg"
      />
      <DecorativeCircle
        size="80px"
        top="50%"
        left="12%"
        color="primary.main"
        opacity={0.18}
        hideBelow="md"
      />
      <DecorativeCircle
        size="220px"
        bottom="5%"
        right="8%"
        color="primary.light"
        opacity={0.35}
        hideBelow="lg"
      />
      <DecorativeCircle
        size="90px"
        top="25%"
        left="35%"
        color="primary.main"
        opacity={0.12}
        hideBelow="xl"
      />
      <DecorativeCircle
        size="130px"
        top="60%"
        right="25%"
        color="primary.light"
        opacity={0.28}
        hideBelow="md"
      />
      <DecorativeCircle
        size="350px"
        bottom="10%"
        left="30%"
        color="primary.main"
        opacity={0.08}
        hideBelow="xl"
      />
    </Box>
  )
}
