import type { FunctionComponent, ReactNode } from 'react'
import { Sidebar } from './sidebar'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    height: '100vh',
    padding: '1.5rem'
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
