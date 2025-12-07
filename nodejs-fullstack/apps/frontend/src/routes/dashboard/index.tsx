import { Dashboard } from '@/components/dashboard'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { ImagesIcon, UploadIcon, UsersIcon } from 'lucide-react'
import { Button } from '@/components/button'

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
          <Button stylexStyles={styles.dashboardActionsButton}>
            <UploadIcon />
            <Typography.SemiboldType16>
              <Font.Body>Upload</Font.Body>
            </Typography.SemiboldType16>
          </Button>
        </div>
      </Dashboard.Content>
    </Dashboard.Layout>
  )
}
