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
import { menuItems } from './items'

export function HeaderMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
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
                  onClick={toggleDrawer(false)}
                  sx={{
                    my:0,
                    py:0,
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Login no Menu */}
          <Box sx={{ p: 2 }}>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              fullWidth
              onClick={toggleDrawer(false)}
              sx={{
                bgcolor: 'primary.dark',
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

