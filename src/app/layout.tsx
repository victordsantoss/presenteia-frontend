import type { Metadata } from 'next'
import './globals.css'
import '@/configs/styles/reset.css'
import { AppProviders } from '@/providers/app-providers'

export const metadata: Metadata = {
  title: 'Presenteia - Presenteie quem você ama',
  description: 'Transforme momentos especiais em presentes inesquecíveis.',
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
