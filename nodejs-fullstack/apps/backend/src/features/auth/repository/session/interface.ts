import { Context, type Effect, type Option } from 'effect'
import type { AuthSession } from '@/types'
import type {
  AuthSessionRepositoryError,
  AuthSessionRepositoryNotFoundError
} from './error'

export class AuthSessionRepository extends Context.Tag('AuthSessionRepository')<
  AuthSessionRepository,
  {
    create: (
      payload: AuthSession.Insertable
    ) => Effect.Effect<AuthSession.Selectable, AuthSessionRepositoryError>

    findById: (
      id: string
    ) => Effect.Effect<
      Option.Option<AuthSession.Selectable>,
      AuthSessionRepositoryError
    >

    updateById: (
      id: string,
      payload: Omit<
        AuthSession.Updateable,
        'id' | 'token' | 'user_id' | 'created_at' | 'updated_at'
      >
    ) => Effect.Effect<AuthSession.Selectable, AuthSessionRepositoryError>

    deleteById: (
      id: string
    ) => Effect.Effect<
      void,
      AuthSessionRepositoryError | AuthSessionRepositoryNotFoundError
    >
  }
>() {}
