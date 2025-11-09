import type { Result } from 'true-myth'
import type { AuthUser } from '@/types'

export type AuthUserRepositoryError = 'ERR_UNEXPECTED'

abstract class AuthUserRepository {
  public abstract create(
    payload: AuthUser.Insertable
  ): Promise<Result<AuthUser.Selectable, AuthUserRepositoryError>>

  public abstract findByEmail(
    email: string
  ): Promise<Result<AuthUser.Selectable | null, AuthUserRepositoryError>>

  public abstract findByReferralCode(
    referral_code: string
  ): Promise<Result<AuthUser.Selectable | null, AuthUserRepositoryError>>

  public abstract findById(
    id: string
  ): Promise<Result<AuthUser.Selectable | null, AuthUserRepositoryError>>

  public abstract updateById(
    id: string,
    payload: Omit<AuthUser.Updateable, 'id' | 'referral_code' | 'updated_at'>
  ): Promise<Result<AuthUser.Selectable, AuthUserRepositoryError>>
}

export default AuthUserRepository
