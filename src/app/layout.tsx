import type { Metadata } from 'next'
import './globals.css'
import '@/configs/styles/reset.css'
import { AppProviders } from '@/providers/app-providers'

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
