import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  header: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  }
})

export const Header: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <header {...stylex.props(styles.header)}>{children}</header>
