'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, CardGiftcard as GiftIcon } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { menuItems } from './items'
import { DisabledTooltip } from '@/components/DisabledTooltip'

export function HeaderMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleMenuClick = (e: React.MouseEvent, href: string, anchor?: string) => {
    setDrawerOpen(false)
    
    // Se estiver na home e tiver âncora, faz scroll suave
    if (isHome && anchor) {
      e.preventDefault()
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Se não estiver na home, redireciona para /#ancora
    else if (!isHome && anchor) {
      e.preventDefault()
      router.push(href)
    }
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          bgcolor: 'background.default',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        })}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Botão Menu Hamburger - Esquerda */}
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Logo - Centro */}
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
              }}
            >
              <GiftIcon
                sx={{
                  fontSize: 32,
                  color: 'primary.main',
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.2 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.contrastText',
                    fontSize: '1.25rem',
                  }}
                >
                  Presenteia
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '0.6rem',
                    color: 'primary.main',
                    fontWeight: 700,
                  }}
                >
                  .com.br
                </Typography>
              </Box>
            </Box>
          </Link>

          {/* Botão Login - Direita (removido do mobile, fica só no drawer) */}
          <Box sx={{ width: 40 }} /> {/* Spacer para manter logo centralizada */}
        </Toolbar>
      </AppBar>

      {/* Drawer Menu Lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          {/* Header do Drawer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GiftIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.contrastText' }}>
                Menu
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer(false)} color="primary">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.href, item.anchor)}
                  sx={{
                    py: 0,
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: 'primary.contrastText',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Login no Menu */}
          <Box sx={{ p: 2 }}>
            <DisabledTooltip title="Em breve!">
              <Button
                component="button"
                variant="contained"
                fullWidth
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
        </Box>
      </Drawer>
    </>
  )
}

