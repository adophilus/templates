import { addSeconds } from 'date-fns'
import { Result } from 'true-myth'
import { ulid } from 'ulidx'
import type {
  AuthTokenRepository,
  AuthUserRepository
} from '@/features/auth/repository'
import { generateToken } from '@/features/auth/utils/token'
import { config } from '@/features/config'
import type { Mailer } from '@/features/mailer'
import { SIGN_UP_VERIFICATION_TOKEN_PURPOSE_KEY } from '@/types'
import SignUpVerificationMail from './mail/sign-up-verification'
import type { Request, Response } from './types'

class SendSignUpVerificationEmailUseCase {
  constructor(
    private authUserRepository: AuthUserRepository,
    private authTokenRepository: AuthTokenRepository,
    private mailer: Mailer
  ) {}

  async execute(
    payload: Request.Body
  ): Promise<Result<Response.Success, Response.Error>> {
    const existingUserResult = await this.authUserRepository.findByEmail(
      payload.email
    )
    if (existingUserResult.isErr) {
      return Result.err({
        code: 'ERR_UNEXPECTED'
      })
    }

    const existingUser = existingUserResult.value
    if (existingUser)
      return Result.err({
        code: 'ERR_EMAIL_ALREADY_IN_USE'
      })

    const userId = ulid()

    const userCreationResult = await this.authUserRepository.create({
      ...payload,
      id: userId
    })

    if (userCreationResult.isErr)
      return Result.err({
        code: 'ERR_UNEXPECTED'
      })

    const user = userCreationResult.value

    const tokenExpiryTime = addSeconds(
      new Date(),
      config.auth.token.signup.expiry
    ).toISOString()

    const tokenCreationResult = await this.authTokenRepository.create({
      id: ulid(),
      token: generateToken(),
      purpose: SIGN_UP_VERIFICATION_TOKEN_PURPOSE_KEY,
      user_id: user.id,
      expires_at: tokenExpiryTime
    })

    if (tokenCreationResult.isErr)
      return Result.err({
        code: 'ERR_UNEXPECTED'
      })

    const token = tokenCreationResult.value

    await this.mailer.send({
      recipients: [user.email],
      subject: 'Verify your account',
      email: SignUpVerificationMail({ token })
    })

    return Result.ok({
      code: 'VERIFICATION_EMAIL_SENT'
    })
  }
}

export default SendSignUpVerificationEmailUseCase
