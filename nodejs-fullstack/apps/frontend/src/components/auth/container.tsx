import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'
import { Typography } from '../typography'
import { Font } from '../font'

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
    color: color.secondary,
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  bannerQuoteAuthor: {
    color: color.secondary,
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
        <Typography.BoldType32>
          <Font.Aesthetic>
            Do the best you can until you know better. Then when you know
            better, do better.
          </Font.Aesthetic>
        </Typography.BoldType32>
      </header>
      <p {...stylex.props(styles.bannerQuoteAuthor)}>~ Maya Angelou</p>
    </div>
    <div {...stylex.props(styles.content)}>
      <div {...stylex.props(styles.contentInner)}>{children}</div>
    </div>
  </div>
)
