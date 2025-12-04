'use client'

import { ReactNode } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Header } from './components/header/desktop'
import { HeaderMobile } from './components/header/mobile'
import { Footer } from './components/footer'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {isMobile ? <HeaderMobile /> : <Header />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  )
}
