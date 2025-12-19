import { Context, type Effect } from 'effect'
import type { AuthSession } from '@/types'
import type { AuthSessionServiceError, InvalidSessionError } from './error' // Import InvalidSessionError

export class AuthSessionService extends Context.Tag('AuthSessionService')<
  AuthSessionService,
  {
    create: (
      userId: string
    ) => Effect.Effect<AuthSession.Selectable, AuthSessionServiceError>

    findById: (
      sessionId: string
    ) => Effect.Effect<AuthSession.Selectable, AuthSessionServiceError | InvalidSessionError>

    extendExpiry: (
      sessionId: string
    ) => Effect.Effect<
      AuthSession.Selectable,
      AuthSessionServiceError | InvalidSessionError
    > // Changed error type

    deleteAllExpired: () => Effect.Effect<void, AuthSessionServiceError>

    validate: (
      session: AuthSession.Selectable // Changed from sessionId: string
    ) => Effect.Effect<AuthSession.Selectable, InvalidSessionError> // Removed AuthSessionServiceError as it will not interact with repo directly
  }
>() {}
