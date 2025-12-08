import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  header: {
    display: 'flex',
    paddingBlock: { default: '0.5rem', [breakpoint.lg]: '1rem' },
    gap: '0.5rem',
    alignItems: 'center'
  }
})

export const Header: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <header {...stylex.props(styles.header)}>{children}</header>
