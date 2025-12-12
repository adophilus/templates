import { Data } from 'effect'

export class AuthTokenRepositoryError extends Data.TaggedError(
  'AuthTokenRepositoryError'
)<{
  message: string
  cause?: unknown
}> {}

export class AuthTokenRepositoryNotFoundError extends Data.TaggedError(
  'AuthTokenRepositoryNotFoundError'
)<{
  message: string
  cause?: unknown
}> {}

export class AuthTokenRepositoryValidationError extends Data.TaggedError(
  'AuthTokenRepositoryValidationError'
)<{
  message: string
  cause?: unknown
}> {}

export type AuthTokenRepositoryOperationError =
  | AuthTokenRepositoryError
  | AuthTokenRepositoryNotFoundError
  | AuthTokenRepositoryValidationError
