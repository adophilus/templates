import { Schema } from 'effect'

const VerificationEmailSent = Schema.Struct({
  code: Schema.Literal('VERIFICATION_EMAIL_SENT')
})

export default VerificationEmailSent
