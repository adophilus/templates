import { Context, type Effect, type Option } from 'effect'
import type {
  AuthSessionServiceOperationError,
  AuthSessionServiceError,
  AuthSessionServiceValidationError
} from './error'
import type { AuthUser } from '@/types'

export class AuthSessionService extends Context.Tag('AuthSessionService')<
  AuthSessionService,
  {
    create: (
      userId: string
    ) => Effect.Effect<string, AuthSessionServiceOperationError>

    validate: (
      token: string
    ) => Effect.Effect<Option.Option<AuthUser.Selectable>, AuthSessionServiceError>
  }
>() { }

export type { AuthSessionServiceOperationError } from './error'