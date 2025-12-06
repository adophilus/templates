import { Dashboard } from '@/components/dashboard'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { ImagesIcon, UsersIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverviewPage
})

const styles = stylex.create({
  cardsContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '1rem'
  }
})

function DashboardOverviewPage() {
  return (
    <Dashboard.Layout>
      <Dashboard.Content>
        <Typography.SemiboldType32>
          <Font.Body>Overview</Font.Body>
        </Typography.SemiboldType32>
        <div {...stylex.props(styles.cardsContainer)}>
          <Dashboard.Card title="Users" value={0} icon={UsersIcon} />
          <Dashboard.Card title="Uploads" value={0} icon={ImagesIcon} />
        </div>
      </Dashboard.Content>
    </Dashboard.Layout>
  )
}
