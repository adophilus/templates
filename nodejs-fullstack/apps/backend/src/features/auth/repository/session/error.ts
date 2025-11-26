import { Data } from 'effect'

export class AuthSessionRepositoryError extends Data.TaggedError(
  'AuthSessionRepositoryError'
)<{
  message: string
  cause?: unknown
}> {}

export class AuthSessionRepositoryNotFoundError extends Data.TaggedError(
  'AuthSessionRepositoryNotFoundError'
)<{
  message: string
  cause?: unknown
}> {}

export class AuthSessionRepositoryConstraintError extends Data.TaggedError(
  'AuthSessionRepositoryConstraintError'
)<{
  message: string
  cause?: unknown
}> {}

export type AuthSessionRepositoryOperationError =
  | AuthSessionRepositoryError
  | AuthSessionRepositoryNotFoundError
  | AuthSessionRepositoryConstraintError
