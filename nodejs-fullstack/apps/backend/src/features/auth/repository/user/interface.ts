import { Context, type Option, type Effect } from 'effect'
import type { AuthUser } from '@/types'
import type {
  AuthUserRepositoryError,
  AuthUserRepositoryNotFoundError
} from './error'

export class AuthUserRepository extends Context.Tag('AuthUserRepository')<
  AuthUserRepository,
  {
    create: (
      payload: AuthUser.Insertable
    ) => Effect.Effect<AuthUser.Selectable, AuthUserRepositoryError>

    findByEmail: (
      email: string
    ) => Effect.Effect<
      Option.Option<AuthUser.Selectable>,
      AuthUserRepositoryError
    >

    findById: (
      id: string
    ) => Effect.Effect<
      Option.Option<AuthUser.Selectable>,
      AuthUserRepositoryError
    >

    updateById: (
      id: string,
      payload: Omit<
        AuthUser.Updateable,
        'id' | 'referral_code' | 'created_at' | 'updated_at'
      >
    ) => Effect.Effect<AuthUser.Selectable, AuthUserRepositoryError>

    deleteById: (
      id: string
    ) => Effect.Effect<
      void,
      AuthUserRepositoryError | AuthUserRepositoryNotFoundError
    >
  }
>() {}
