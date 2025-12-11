import * as stylex from '@stylexjs/stylex'
import { Typography } from '../typography'
import { color } from '@/styles/design/tokens.stylex'
import { Font } from '../font'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem'
  },
  header: {
    color: color.primary
  },
  leading: {
    color: color.primary
  }
})

export const SignInHeader = () => (
  <hgroup {...stylex.props(styles.container)}>
    <header>
      <Typography.SemiboldType32 stylexStyles={styles.header}>
        <Font.Body>Welcome back</Font.Body>
      </Typography.SemiboldType32>
    </header>
    <p>
      <Typography.RegularType14 stylexStyles={styles.leading}>
        <Font.Body>Enter your details to login</Font.Body>
      </Typography.RegularType14>
    </p>
  </hgroup>
)
