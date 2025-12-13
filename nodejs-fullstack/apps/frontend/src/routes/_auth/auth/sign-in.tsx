import { Auth } from '@/components/auth'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { Button } from '@/components/button'
import { breakpoint } from '@/styles/design/tokens.stylex'

export const Route = createFileRoute('/_auth/auth/sign-in')({
  component: AuthSignInPage
})

const styles = stylex.create({
  header: {
    visibility: { default: 'hidden', [breakpoint.lg]: 'visible' },
    display: 'flex',
    justifyContent: 'end'
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
    textDecoration: 'underline'
  }
})

function AuthSignInPage() {
  return (
    <>
      <div {...stylex.props(styles.header)}>
        <Link to="/auth/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
      <div {...stylex.props(styles.body)}>
        <Auth.SignInHeader />
        <Auth.Form.SignInProvider>
          <Auth.Form.Container>
            <Auth.Form.Email />
          </Auth.Form.Container>
        </Auth.Form.SignInProvider>
      </div>
      <div {...stylex.props(styles.footer)}>
        <Link {...stylex.props(styles.footerLink)} to="/auth/sign-up">
          Don't have an account?
        </Link>
      </div>
    </>
  )
}
