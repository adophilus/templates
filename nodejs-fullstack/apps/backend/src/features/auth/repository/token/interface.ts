import { Context, Option, type Effect } from 'effect'
import type { AuthToken } from '@/types'
import type {
  AuthTokenRepositoryOperationError,
  AuthTokenRepositoryError,
  AuthTokenRepositoryNotFoundError
} from './error'

export class AuthTokenRepository extends Context.Tag('AuthTokenRepository')<
  AuthTokenRepository,
  {
    create: (
      payload: AuthToken.Insertable
    ) => Effect.Effect<AuthToken.Selectable, AuthTokenRepositoryOperationError>

    findByUserIdAndPurpose: (payload: {
      user_id: string
      purpose: string
    }) => Effect.Effect<
      Option.Option<AuthToken.Selectable>,
      AuthTokenRepositoryError
    >

    updateById: (
      id: string,
      payload: Omit<
        AuthToken.Updateable,
        'id' | 'purpose' | 'user_id' | 'created_at' | 'updated_at'
      >
    ) => Effect.Effect<AuthToken.Selectable, AuthTokenRepositoryOperationError>

    findById: (
      id: string
    ) => Effect.Effect<
      Option.Option<AuthToken.Selectable>,
      AuthTokenRepositoryError
    >

    deleteById: (
      id: string
    ) => Effect.Effect<
      void,
      AuthTokenRepositoryError | AuthTokenRepositoryNotFoundError
    >
  }
>() {}

export type { AuthTokenRepositoryOperationError } from './error'
