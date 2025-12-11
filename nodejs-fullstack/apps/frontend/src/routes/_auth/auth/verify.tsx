import { Auth } from '@/components/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/verify')({
  component: AuthVerifyEmailPage
})

function AuthVerifyEmailPage() {
  return (
    <>
      <Auth.VerifyEmailHeader />
      <Auth.Form.VerificationProvider>
        <Auth.Form.Container>
          <Auth.Form.Otp />
        </Auth.Form.Container>
      </Auth.Form.VerificationProvider>
    </>
  )
}
