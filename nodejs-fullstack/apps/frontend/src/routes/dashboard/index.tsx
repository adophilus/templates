import { Dashboard } from '@/components/dashboard'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverviewPage
})

function DashboardOverviewPage() {
  return (
    <Dashboard.Layout>
      <Typography.SemiboldType32>
        <Font.Body>Overview</Font.Body>
      </Typography.SemiboldType32>
    </Dashboard.Layout>
  )
}
