import { Auth } from '@/components/auth'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'
import { Button } from '@/components/button'

export const Route = createFileRoute('/_auth/auth/sign-up')({
  component: AuthSignUpPage
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

function AuthSignUpPage() {
  return (
    <>
      <div {...stylex.props(styles.header)}>
        <Link to="/auth/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
      <div {...stylex.props(styles.body)}>
        <Auth.SignUpHeader />
        <Auth.Form.SignUpProvider>
          <Auth.Form.Container>
            <Auth.Form.FullName />
            <Auth.Form.Email />
          </Auth.Form.Container>
        </Auth.Form.SignUpProvider>
      </div>
      <div {...stylex.props(styles.footer)}>
        <Link {...stylex.props(styles.footerLink)} to="/auth/sign-in">
          Already have an account?
        </Link>
      </div>
    </>
  )
}
