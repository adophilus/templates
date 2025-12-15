import { Dashboard } from '@/components/dashboard'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout
})

function DashboardLayout() {
  return (
    <Dashboard.Layout>
      <Outlet />
    </Dashboard.Layout>
  )
}
