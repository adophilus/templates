import { Data } from 'effect'

export class AuthUserRepositoryError extends Data.TaggedError('AuthUserRepositoryError')<{
  message: string
  cause?: unknown
}> { }

export class AuthUserRepositoryNotFoundError extends Data.TaggedError('AuthUserRepositoryNotFoundError')<{
  message: string
  cause?: unknown
}> { }

export class AuthUserRepositoryValidationError extends Data.TaggedError('AuthUserRepositoryValidationError')<{
  message: string
  cause?: unknown
}> { }

export class AuthUserRepositoryConstraintError extends Data.TaggedError('AuthUserRepositoryConstraintError')<{
  message: string
  cause?: unknown
}> { }

export type AuthUserRepositoryOperationError = 
  | AuthUserRepositoryError 
  | AuthUserRepositoryNotFoundError
  | AuthUserRepositoryValidationError
  | AuthUserRepositoryConstraintError