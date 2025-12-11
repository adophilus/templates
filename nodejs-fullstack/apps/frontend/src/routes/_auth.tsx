import { Auth } from '@/components/auth'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout
})

function AuthLayout() {
  return (
    <Auth.Container>
      <Outlet />
    </Auth.Container>
  )
}
