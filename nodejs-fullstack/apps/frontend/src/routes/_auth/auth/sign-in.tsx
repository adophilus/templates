import { Auth } from '@/components/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/sign-in')({
  component: AuthSignInPage
})

function AuthSignInPage() {
  return (
    <>
      <Auth.LoginHeader />
      <Auth.Form.SignInProvider>
        <Auth.Form.Container>
          <Auth.Form.Email />
          <Auth.Form.Submit />
        </Auth.Form.Container>
      </Auth.Form.SignInProvider>
    </>
  )
}
