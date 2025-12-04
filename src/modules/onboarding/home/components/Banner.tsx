'use client'

import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material'
import Link from 'next/link'
import { DisabledTooltip } from '@/components/disabled-tooltip'

const badges = [
  { icon: '✨', text: 'Grátis para sempre' },
  { icon: '🎁', text: 'Fácil de usar' },
  { icon: '🎉', text: 'Compartilhe com todos' },
]

const buttons = [
  {
    label: 'Criar uma lista',
    href: '/criar-lista',
    variant: 'contained',
    icon: AddIcon,
    disabled: true,
    tooltipText: 'Em breve!',
  },
  {
    label: 'Buscar uma lista',
    href: '/buscar-lista',
    variant: 'outlined',
    icon: SearchIcon,
    disabled: true,
    tooltipText: 'Em breve!',
  },
] as const

export function Banner() {
  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        bgcolor: 'background.default',
        py: { xs: 8, md: 12 },
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
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          {/* Título Principal */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              color: 'primary.dark',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Crie uma lista de presentes para{' '}
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  bgcolor: 'primary.light',
                  opacity: 0.3,
                  zIndex: -1,
                },
              }}
            >
              qualquer ocasião
            </Box>
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              color: 'text.primary',
              mb: 5,
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            O Presenteia é a maneira mais fácil de trocar presentes com amigos e familiares em
            aniversários, festas e muito mais!
          </Typography>

          {/* Botões de Ação */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {buttons.map((button) => {
              const IconComponent = button.icon
              const buttonElement = (
                <Button
                  key={button.href}
                  component={button.disabled ? 'button' : Link}
                  href={button.disabled ? undefined : button.href}
                  variant={button.variant}
                  color="primary"
                  size="large"
                  startIcon={<IconComponent />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    minWidth: { xs: '100%', sm: '220px' },
                    ...(button.variant === 'contained' && {
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s',
                      },
                    }),
                    ...(button.variant === 'outlined' && {
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s',
                      },
                    }),
                  }}
                >
                  {button.label}
                </Button>
              )

              return button.disabled ? (
                <DisabledTooltip key={button.href} title={button.tooltipText}>
                  {buttonElement}
                </DisabledTooltip>
              ) : (
                buttonElement
              )
            })}
          </Stack>

          {/* Badges */}
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {badges.map((badge, index) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: 'primary.light',
                  borderRadius: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 500 }}>
                  {badge.icon} {badge.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
