import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Devtools } from '../components/devtools'
import { Toaster } from 'sonner'
import { RegistryProvider } from '@effect-atom/atom-react'
import { InitRuntime } from '@/services/atom'

const RootLayout = () => (
  <RegistryProvider>
    <InitRuntime />
    <Outlet />
    <Toaster />
    <Devtools />
  </RegistryProvider>
)

export const Route = createRootRoute({ component: RootLayout })
