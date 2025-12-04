import type { Metadata } from 'next'
import './globals.css'
import '@/configs/styles/reset.css'
import { AppProviders } from '@/providers/app-providers'

export const metadata: Metadata = {
  title: 'Presenteia - Presenteie quem você ama',
  description: 'Transforme momentos especiais em presentes inesquecíveis.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Presenteia - Presenteie quem você ama',
    description: 'Transforme momentos especiais em presentes inesquecíveis.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Presenteia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presenteia - Presenteie quem você ama',
    description: 'Transforme momentos especiais em presentes inesquecíveis.',
  },
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
