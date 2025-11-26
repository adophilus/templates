import { Data } from 'effect'

export class AuthSessionServiceError extends Data.TaggedError('AuthSessionServiceError')<{
  message: string
  cause?: unknown
}> {}

export class AuthSessionServiceValidationError extends Data.TaggedError('AuthSessionServiceValidationError')<{
  message: string
  cause?: unknown
}> {}

export type AuthSessionServiceOperationError =
  | AuthSessionServiceError
  | AuthSessionServiceValidationError