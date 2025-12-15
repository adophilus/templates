import { Auth } from '@/components/auth'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Schema } from 'effect'
import * as stylex from '@stylexjs/stylex'
import { breakpoint, color } from '@/styles/design/tokens.stylex'
import { Button } from '@/components/button'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { ArrowLeftIcon } from 'lucide-react'
import { Input } from '@/components/input'

const searchSchema = Schema.standardSchemaV1(
  Schema.Struct({
    email: Schema.String
  })
)

export const Route = createFileRoute('/_auth/auth/verify')({
  component: AuthVerifyEmailPage,
  validateSearch: searchSchema
})

const styles = stylex.create({
  header: {
    visibility: { default: 'hidden', [breakpoint.lg]: 'visible' },
    display: 'flex',
    justifyContent: 'end'
  },
  headerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  headerIcon: {
    aspectRatio: '1 / 1',
    width: '1rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'center'
  },
  body: {
    maxWidth: '26rem'
  },
  footerLink: {
    visibility: { default: 'visible', [breakpoint.lg]: 'hidden' },
    borderBottomWidth: '1px',
    borderBottomColor: color.primary
  },
  footerIcon: {
    aspectRatio: '1 / 1',
    width: '1rem'
  },
  footerInner: {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center'
  }
})

function AuthVerifyEmailPage() {
  const { email } = Route.useSearch()

  return (
    <>
      <div {...stylex.props(styles.header)}>
        <Link to="/auth/sign-in">
          <Button stylexStyles={styles.headerButton}>
            <ArrowLeftIcon {...stylex.props(styles.headerIcon)} />
            <Typography.SemiboldType14>
              <Font.Body>Sign In</Font.Body>
            </Typography.SemiboldType14>
          </Button>
        </Link>
      </div>
      <div {...stylex.props(styles.body)}>
        <Auth.VerifyEmailHeader />
        <Auth.Form.VerificationProvider>
          <Auth.Form.Container>
            <Auth.Form.Otp />
            <Auth.Form.Hidden name="email" value={email} />
          </Auth.Form.Container>
        </Auth.Form.VerificationProvider>
      </div>
      <div {...stylex.props(styles.footer)}>
        <Link {...stylex.props(styles.footerLink)} to="/auth/sign-in">
          <Typography.SemiboldType14>
            <Font.Body stylexStyles={styles.footerInner}>
              <ArrowLeftIcon {...stylex.props(styles.footerIcon)} />
              Back to Sign in
            </Font.Body>
          </Typography.SemiboldType14>
        </Link>
      </div>
    </>
  )
}
