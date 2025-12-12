import { Auth } from '@/components/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/sign-up')({
  component: AuthSignUpPage
})

function AuthSignUpPage() {
  return (
    <>
      <Auth.SignUpHeader />
      <Auth.Form.SignUpProvider>
        <Auth.Form.Container>
          <Auth.Form.FullName />
          <Auth.Form.Email />
        </Auth.Form.Container>
      </Auth.Form.SignUpProvider>
    </>
  )
}
