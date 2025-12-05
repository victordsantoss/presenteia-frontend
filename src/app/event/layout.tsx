'use client'

import { ReactNode } from 'react'
import { PublicLayout } from '@/components/layout/public'

interface EventLayoutProps {
  children: ReactNode
}

export default function EventLayout({ children }: EventLayoutProps) {
  return <PublicLayout>{children}</PublicLayout>
}
