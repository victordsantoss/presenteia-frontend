'use client'

import { ReactNode } from 'react'
import { Box } from '@mui/material'
import { Footer } from './components/footer'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
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
