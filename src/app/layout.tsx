import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import defaultTheme from '@/configs/styles/theme/default-theme'
import './globals.css'
import '@/configs/styles/reset.css'
import { PublicLayout } from '@/components/layout/Public'

export const metadata: Metadata = {
  title: 'Presenteia',
  description: 'O lugar perfeito para encontrar presentes especiais',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <PublicLayout>{children} </PublicLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
