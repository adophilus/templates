import type { FunctionComponent, ReactNode } from 'react'
import { Sidebar } from './sidebar'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    padding: { default: '0.25rem', [breakpoint.lg]: '1.5rem' }
  }
})

export const Layout: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <div {...stylex.props(styles.container)}>
    <Sidebar />
    {children}
  </div>
)
