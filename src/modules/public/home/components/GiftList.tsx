'use client'

import { Box, Typography, Button, Container } from '@mui/material'
import { CardGiftcard as GiftIcon, Add as AddIcon } from '@mui/icons-material'
import Link from 'next/link'

export function GiftList() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'primary.main',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, 
            rgba(19, 41, 61, 0.3) 0%, 
            rgba(45, 130, 183, 0.1) 100%)`,
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
              color: 'primary.contrastText',
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
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.8,
              maxWidth: '600px',
              mb: 2,
            }}
          >
            Crie sua lista em minutos, compartilhe com quem você ama e receba exatamente o que
            deseja. É simples, rápido e totalmente gratuito.
          </Typography>

          {/* CTA Button */}
          <Button
            component={Link}
            href="/criar-lista"
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

      {/* Círculo Grande - Esquerda Inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Círculo Médio - Topo Esquerdo */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      />

      {/* Círculo Pequeno - Direita Centro */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Círculo Médio - Centro Direita */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.04)',
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      />

      {/* Círculo Pequeno - Topo Centro */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '45%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.07)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Círculo Pequeno - Esquerda Centro */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '35%',
          left: '8%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          zIndex: 0,
          display: { xs: 'none', xl: 'block' },
        }}
      />
    </Box>
  )
}
