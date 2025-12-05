'use client'

import { ReactNode } from 'react'
import { AuthLayout } from '@/components/layout/auth'

interface IAuthLayoutWrapperProps {
  children: ReactNode
}

export default function AuthLayoutWrapper({ children }: IAuthLayoutWrapperProps) {
  return <AuthLayout>{children}</AuthLayout>
}
