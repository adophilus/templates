import type { FunctionComponent, ReactNode } from 'react'
import { Sidebar } from './sidebar'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    // gridAutoColumns: '300px 1fr',
    height: '100vh',
    padding: { default: '0.25rem', '@media (width >= 375px)': '1.5rem' }
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
