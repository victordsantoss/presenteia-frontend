'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import defaultTheme from '@/configs/styles/theme/default-theme'
import { QueryProvider } from './query-provider'
import { MetadataProvider } from '@/contexts/metadata.context'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <MetadataProvider>{children}</MetadataProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
