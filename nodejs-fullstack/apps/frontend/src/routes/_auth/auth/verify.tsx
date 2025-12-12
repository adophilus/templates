import { Auth } from '@/components/auth'
import { createFileRoute } from '@tanstack/react-router'
import { Schema } from 'effect'

const searchSchema = Schema.standardSchemaV1(
  Schema.Struct({
    email: Schema.String
  })
)

export const Route = createFileRoute('/_auth/auth/verify')({
  component: AuthVerifyEmailPage,
  validateSearch: searchSchema
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
