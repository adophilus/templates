import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    paddingInline: '5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '2rem'
  }
})

export const Content: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <div {...stylex.props(styles.container)}>{children}</div>
