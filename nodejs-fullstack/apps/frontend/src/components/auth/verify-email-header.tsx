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

export const VerifyEmailHeader = () => (
  <hgroup {...stylex.props(styles.container)}>
    <header>
      <Typography.SemiboldType32 stylexStyles={styles.header}>
        <Font.Body>Verification Required</Font.Body>
      </Typography.SemiboldType32>
    </header>
    <p>
      <Typography.RegularType14 stylexStyles={styles.leading}>
        <Font.Body>
          Please check your mailbox for a verification email
        </Font.Body>
      </Typography.RegularType14>
    </p>
  </hgroup>
)
