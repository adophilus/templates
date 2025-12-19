import { Data } from 'effect'

export class AuthSessionServiceError extends Data.TaggedError(
  'AuthSessionServiceError'
)<{
  message: string
  cause?: unknown
}> {}

export class InvalidSessionError extends Data.TaggedError(
  'InvalidSessionError'
)<{
  message?: string
  cause?: unknown
}> {}
