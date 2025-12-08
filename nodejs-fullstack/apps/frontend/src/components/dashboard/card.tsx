import type { FunctionComponent, ReactNode } from 'react'
import { Typography } from '../typography'
import type { LucideIcon } from 'lucide-react'
import { Font } from '../font'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    padding: '1.5rem',
    borderColor: color.primary,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export const Card: FunctionComponent<{
  title: ReactNode
  value: ReactNode
  icon: LucideIcon
}> = ({ title, value, icon: Icon }) => (
  <div {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.contentContainer)}>
      <Typography.MediumType16>
        <Font.Body>{title}</Font.Body>
      </Typography.MediumType16>
      <Typography.SemiboldType32>
        <Font.Body>{value}</Font.Body>
      </Typography.SemiboldType32>
    </div>
    <Icon />
  </div>
)
