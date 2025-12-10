import type { FunctionComponent, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { breakpoint, color } from '@/styles/design/tokens.stylex'
import { Typography } from '../typography'
import { Font } from '../font'

export const styles = stylex.create({
  container: {
    display: 'grid',
    gridTemplateColumns: { default: '1fr', [breakpoint.lg]: '1fr 1fr' },
    height: '100vh',
    backgroundColor: color.secondary
  },
  banner: {
    backgroundColor: color.primary,
    margin: '1rem',
    padding: '1.5rem',
    borderRadius: '1rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: { default: 'none', [breakpoint.lg]: 'flex' }
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
    alignContent: 'center',
    maxWidth: '26rem'
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
    <div {...stylex.props(styles.content)}>{children}</div>
  </div>
)
