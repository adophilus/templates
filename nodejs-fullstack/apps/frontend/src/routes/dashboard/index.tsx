import { Dashboard } from '@/components/dashboard'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { ImagesIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverviewPage
})

const styles = stylex.create({
  dashboardImage: {
    width: '2rem',
    height: '2rem'
  },
  dashboardActionsRow: {
    display: 'flex',
    justifyContent: 'end'
  },
  dashboardActionsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem'
  }
})

function DashboardOverviewPage() {
  return (
    <Dashboard.Layout>
      <Dashboard.Content>
        <Dashboard.Header>
          <ImagesIcon {...stylex.props(styles.dashboardImage)} />
          <Typography.SemiboldType32>
            <Font.Body>Images</Font.Body>
          </Typography.SemiboldType32>
        </Dashboard.Header>
        <div {...stylex.props(styles.dashboardActionsRow)}>
          <Dashboard.Upload.Button stylexStyles={styles.dashboardActionsButton} />
        </div>
        <Dashboard.Image.Gallery />
      </Dashboard.Content>
    </Dashboard.Layout>
  )
}
