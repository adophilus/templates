import { Dashboard } from '@/components/dashboard'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { ImagesIcon } from 'lucide-react'
import { breakpoint } from '@/styles/design/tokens.stylex'
import { Breakpoint } from '@/components/breakpoint'

export const Route = createFileRoute('/_dashboard/dashboard/')({
  component: DashboardOverviewPage
})

const styles = stylex.create({
  dashboardImage: {
    aspectRatio: '1 / 1',
    width: { default: '1.25rem', [breakpoint.lg]: '2rem' }
  },
  dashboardActionsRow: {
    display: 'flex',
    justifyContent: 'end'
  },
  dashboardActionsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: { default: '1rem 1.5rem', [breakpoint.lg]: '1rem 1.5rem' }
  }
})

function DashboardOverviewPage() {
  return (
    <Dashboard.Layout>
      <Dashboard.Content>
        <Dashboard.Header>
          <ImagesIcon {...stylex.props(styles.dashboardImage)} />
          <Breakpoint
            lg={
              <Typography.SemiboldType32>
                <Font.Body>Images</Font.Body>
              </Typography.SemiboldType32>
            }
          >
            <Typography.SemiboldType24>
              <Font.Body>Images</Font.Body>
            </Typography.SemiboldType24>
          </Breakpoint>
        </Dashboard.Header>
        <div {...stylex.props(styles.dashboardActionsRow)}>
          <Dashboard.Upload.Button
            stylexStyles={styles.dashboardActionsButton}
          />
        </div>
        <Dashboard.Image.Gallery />
      </Dashboard.Content>
    </Dashboard.Layout>
  )
}
