import { color } from '@/styles/design/tokens.stylex'
import { Button } from '../button'
import * as stylex from '@stylexjs/stylex'
import { Typography } from '../typography'
import { Font } from '../font'
import { LayoutDashboardIcon, LogOutIcon, WarehouseIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { breakpoint } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    containerType: 'inline-size',
    top: '0.25rem',
    height: {
      default: 'calc(100vh - var(--sidebar-padding) * 2)',
      [breakpoint.lg]: 'calc(100vh - 0.25rem * 2)'
    },
    position: 'sticky',
    width: {
      default: '60px',
      [breakpoint.lg]: '300px'
    },
    overflow: 'hidden',
    padding: { default: '0.5rem', [breakpoint.lg]: '1rem' },
    backgroundColor: color.primary,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    borderRadius: '1rem',
    flexGrow: 0,
    flexShrink: 0
  },
  header: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: {
      default: 'center',
      '@container (width > 100px)': 'start'
    },
    color: color.secondary,
    aspectRatio: {
      default: '1 / 1',
      '@container (width > 100px)': 'auto'
    },
    paddingInline: {
      default: '0rem',
      '@container (width > 100px)': '1rem'
    }
  },
  headerText: {
    display: {
      default: 'none',
      '@container (width > 100px)': 'block'
    }
  },
  innerContainer: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1.5rem'
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: {
      default: 'center',
      '@container (width > 100px)': 'start'
    },
    padding: {
      default: '0rem',
      '@container (width > 100px)': '0.5rem 1rem'
    },
    aspectRatio: { default: '1 / 1', '@container (width > 100px)': 'auto' },
    gap: '0.5rem',
    ':hover': {
      color: color.primary,
      backgroundColor: `color-mix(in srgb, ${color.primary}, ${color.secondary} 80%)`
    }
  },
  buttonText: {
    display: {
      default: 'none',
      '@container (width > 100px)': 'block'
    }
  },
  buttonActive: {
    color: color.primary,
    backgroundColor: color.secondary
  }
})

export const Sidebar = () => (
  <div {...stylex.props(styles.container)}>
    <header {...stylex.props(styles.header)}>
      <WarehouseIcon />
      <Typography.SemiboldType32 stylexStyles={styles.headerText}>
        <Font.Body>IMAGY</Font.Body>
      </Typography.SemiboldType32>
    </header>
    <div {...stylex.props(styles.innerContainer)}>
      <div>
        <Link to="/dashboard">
          <Button stylexStyles={styles.button}>
            <LayoutDashboardIcon />
            <Typography.SemiboldType16 stylexStyles={styles.buttonText}>
              <Font.Body>Overview</Font.Body>
            </Typography.SemiboldType16>
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">
          <Button stylexStyles={styles.button}>
            <LogOutIcon />
            <Typography.SemiboldType16 stylexStyles={styles.buttonText}>
              <Font.Body>Logout</Font.Body>
            </Typography.SemiboldType16>
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
