'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import defaultTheme from '@/configs/styles/theme/default-theme'
import { QueryProvider } from './query-provider'
import { PublicLayout } from '@/components/layout/Public'
import { MetadataProvider } from '@/contexts/metadata.context'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <MetadataProvider>
          <PublicLayout>{children}</PublicLayout>
        </MetadataProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
