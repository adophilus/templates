import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    paddingInline: '2.5rem'
  }
})

export const Content: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <div {...stylex.props(styles.container)}>{children}</div>
