import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Devtools } from '../components/devtools'
import { Toaster } from 'sonner'
import { RegistryProvider } from '@effect-rx/rx-react'
import { InitRuntime } from '@/services/rx'

const RootLayout = () => (
  <RegistryProvider>
    <InitRuntime />
    <Outlet />
    <Devtools />
  </RegistryProvider>
)

export const Route = createRootRoute({ component: RootLayout })
