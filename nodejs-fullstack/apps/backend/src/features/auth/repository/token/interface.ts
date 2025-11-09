import type { Result } from 'true-myth'
import type { AuthToken } from '@/types'

export type AuthTokenRepositoryError = 'ERR_UNEXPECTED'

abstract class AuthTokenRepository {
  public abstract create(
    payload: AuthToken.Insertable
  ): Promise<Result<AuthToken.Selectable, AuthTokenRepositoryError>>

  public abstract findByUserIdAndPurpose(payload: {
    user_id: string
    purpose: string
  }): Promise<Result<AuthToken.Selectable | null, AuthTokenRepositoryError>>

  public abstract updateById(
    id: string,
    payload: Omit<
      AuthToken.Updateable,
      'id' | 'purpose' | 'user_id' | 'updated_at'
    >
  ): Promise<Result<AuthToken.Selectable, AuthTokenRepositoryError>>
}

export default AuthTokenRepository
