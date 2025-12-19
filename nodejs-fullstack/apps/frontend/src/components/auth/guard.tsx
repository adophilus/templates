import type { FunctionComponent, ReactNode } from 'react'
import { useAuth } from './hooks'
import { Navigate } from '@tanstack/react-router'

export const Guard: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const auth = useAuth()

  if (auth.status === 'unauthenticated') return <Navigate to="/auth/sign-in" />

  return children
}
