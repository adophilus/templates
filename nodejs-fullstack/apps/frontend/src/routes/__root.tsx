import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Devtools } from '../components/devtools'
import { Toaster } from 'sonner'

const RootLayout = () => (
  <>
    <Outlet />
    <Toaster />
    <Devtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
