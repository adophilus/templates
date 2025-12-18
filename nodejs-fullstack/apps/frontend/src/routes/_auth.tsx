import { Auth } from '@/components/auth'
import { useAuth } from '@/components/auth/hooks'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout
})

function AuthLayout() {
  const auth = useAuth()
  if (auth.status === 'authenticated') return <Navigate to="/dashboard" />

  return (
    <Auth.Container>
      <Outlet />
    </Auth.Container>
  )
}
