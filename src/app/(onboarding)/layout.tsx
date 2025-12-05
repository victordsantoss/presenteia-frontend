'use client'

import { ReactNode } from 'react'
import { PublicLayout } from '@/components/layout/public'

interface IOnboardingLayoutProps {
  children: ReactNode
}

export default function OnboardingLayout({ children }: IOnboardingLayoutProps) {
  return <PublicLayout>{children}</PublicLayout>
}
