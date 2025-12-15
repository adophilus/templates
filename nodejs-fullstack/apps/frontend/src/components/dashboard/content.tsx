import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    paddingInline: { default: '1.25rem', [breakpoint.lg]: '5rem' },
    paddingBlock: { default: '1.25rem', [breakpoint.lg]: '3rem' },
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: {
      default: '1rem',
      [breakpoint.lg]: '2rem'
    }
  }
})

export const Content: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <div {...stylex.props(styles.container)}>{children}</div>
