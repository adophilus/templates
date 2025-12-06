import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'
import { Typography } from '../typography'

export const styles = stylex.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100vh',
    backgroundColor: color.secondary
  },
  banner: {
    backgroundColor: color.primary,
    margin: '1rem',
    padding: '1.5rem',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bannerQuoteText: {
    color: '#FEFFF0',
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  bannerQuoteAuthor: {
    color: '#FEFFF0',
    fontSize: '1rem',
    textAlign: 'right'
  },
  content: {
    margin: '1rem',
    padding: '1.5rem',
    borderRadius: '1rem',
    display: 'grid',
    placeContent: 'center'
  },
  contentInner: {
    // backgroundColor: 'red'
  }
})

export const Container: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <div {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.banner)}>
      <header {...stylex.props(styles.bannerQuoteText)}>
        <Typography.BoldType12>You can just do things</Typography.BoldType12>
      </header>
      <p {...stylex.props(styles.bannerQuoteAuthor)}>~ Anonymous</p>
    </div>
    <div {...stylex.props(styles.content)}>
      <div {...stylex.props(styles.contentInner)}>{children}</div>
    </div>
  </div>
)
