import type { FunctionComponent, ReactNode } from 'react'
import { Sidebar } from './sidebar'
import * as stylex from '@stylexjs/stylex'
import { Auth } from '../auth'

const styles = stylex.create({
  container: {
    '--sidebar-padding': '0.25rem',
    display: 'flex',
    padding: 'var(--sidebar-padding)'
  }
})

export const Layout: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <Auth.Guard>
    <div {...stylex.props(styles.container)}>
      <Sidebar />
      {children}
    </div>
  </Auth.Guard>
)
