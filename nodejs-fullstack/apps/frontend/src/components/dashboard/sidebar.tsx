import { color } from '@/styles/design/tokens.stylex'
import { Button as CButton } from '../button'
import * as stylex from '@stylexjs/stylex'
import type { FunctionComponent, ReactNode } from 'react'
import { Typography } from '../typography'
import { Font } from '../font'
import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const styles = stylex.create({
  container: {
    padding: '1rem',
    backgroundColor: color.primary,
    display: 'flex',
    borderRadius: '1rem',
    flexDirection: 'column',
    gap: '1rem'
  },
  button: {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    gap: '0.5rem',
    ':hover': {
      color: color.primary,
      backgroundColor: `color-mix(in srgb, ${color.primary}, ${color.secondary} 80%)`
    }
  },
  buttonActive: {
    color: color.primary,
    backgroundColor: color.secondary
  }
})

const Button: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <CButton stylexStyles={styles.button}>{children}</CButton>
)

export const Sidebar = () => (
  <div {...stylex.props(styles.container)}>
    <Link to="/dashboard">
      <Button>
        <LayoutDashboardIcon />
        <Typography.SemiboldType16>
          <Font.Body>Overview</Font.Body>
        </Typography.SemiboldType16>
      </Button>
    </Link>
  </div>
)
