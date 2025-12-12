import { Auth } from '@/components/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/sign-in')({
  component: AuthSignInPage
})

function AuthSignInPage() {
  return (
    <>
      <Auth.SignInHeader />
      <Auth.Form.SignInProvider>
        <Auth.Form.Container>
          <Auth.Form.Email />
        </Auth.Form.Container>
      </Auth.Form.SignInProvider>
    </>
  )
}
