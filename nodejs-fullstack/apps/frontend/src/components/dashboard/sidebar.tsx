import { color } from '@/styles/design/tokens.stylex'
import { Button as CButton } from '../button'
import * as stylex from '@stylexjs/stylex'
import type { FunctionComponent, ReactNode } from 'react'
import { Typography } from '../typography'
import { Font } from '../font'
import { LayoutDashboardIcon, LogOutIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { BREAKPOINT_SM } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    width: {
      default: '100px',
      '@media (width >= 375px)': '300px'
      // [BREAKPOINT_SM]: '300px'
    },
    overflow: 'hidden',
    padding: '1rem',
    backgroundColor: color.primary,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderRadius: '1rem'
  },
  header: {
    color: color.secondary,
    paddingInline: '1rem'
  },
  innerContainer: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    <header {...stylex.props(styles.header)}>
      <Typography.SemiboldType32>
        <Font.Body>IMAGY</Font.Body>
      </Typography.SemiboldType32>
    </header>
    <div {...stylex.props(styles.innerContainer)}>
      <div>
        <Link to="/dashboard">
          <Button>
            <LayoutDashboardIcon />
            <Typography.SemiboldType16>
              <Font.Body>Overview</Font.Body>
            </Typography.SemiboldType16>
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">
          <Button>
            <LogOutIcon />
            <Typography.SemiboldType16>
              <Font.Body>Logout</Font.Body>
            </Typography.SemiboldType16>
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
