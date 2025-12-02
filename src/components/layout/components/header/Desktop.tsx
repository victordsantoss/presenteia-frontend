'use client'

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import { CardGiftcard as GiftIcon } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuItems } from './items'
import { DisabledTooltip } from '@/components/DisabledTooltip'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleMenuClick = (e: React.MouseEvent, anchor?: string) => {
    // Se estiver na home e tiver âncora, faz scroll suave
    if (isHome && anchor) {
      e.preventDefault()
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Se não estiver na home, deixa o Next.js redirecionar para /#ancora
  }

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        bgcolor: 'background.default',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      })}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 100 },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo - Esquerda */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                <GiftIcon
                  sx={{
                    fontSize: { xs: 48, md: 48 },
                    color: 'primary.main',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.3 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.contrastText',
                      fontSize: { xs: '2rem', md: '2rem' },
                    }}
                  >
                    Presenteia
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '0.8rem',
                      color: 'primary.main',
                      fontWeight: 700,
                    }}
                  >
                    .com.br
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Box>

          {/* Menu - Centro */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              alignItems: 'center',
            }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: 'none' }}
                onClick={(e) => handleMenuClick(e, item.anchor)}
              >
                <Typography
                  sx={{
                    color: 'primary.contrastText',
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      borderBottom: '1px solid',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Login - Direita */}
          <Box>
            <DisabledTooltip title="Em breve!">
              <Button
                component="button"
                variant="contained"
                sx={{
                  bgcolor: 'primary.dark',
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Entrar
              </Button>
            </DisabledTooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
