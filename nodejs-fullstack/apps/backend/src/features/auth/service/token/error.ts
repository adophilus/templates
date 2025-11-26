import { Data } from 'effect'

export class AuthTokenServiceError extends Data.TaggedError('AuthTokenServiceError')<{
  message: string
  cause?: unknown
}> {}

export class AuthTokenServiceNotFoundError extends Data.TaggedError('AuthTokenServiceNotFoundError')<{
  message: string
  cause?: unknown
}> {}

export class AuthTokenServiceValidationError extends Data.TaggedError('AuthTokenServiceValidationError')<{
  message: string
  cause?: unknown
}> {}

export class AuthTokenServiceConstraintError extends Data.TaggedError('AuthTokenServiceConstraintError')<{
  message: string
  cause?: unknown
}> {}

export type AuthTokenServiceOperationError =
  | AuthTokenServiceError
  | AuthTokenServiceNotFoundError
  | AuthTokenServiceValidationError
  | AuthTokenServiceConstraintError