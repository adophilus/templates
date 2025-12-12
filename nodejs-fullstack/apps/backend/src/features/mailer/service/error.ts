import { Data } from 'effect'

export class MailerRenderingError extends Data.TaggedError(
  'MailerRenderingError'
)<{
  message: string
  cause?: unknown
}> {}

export class MailerTransportError extends Data.TaggedError(
  'MailerTransportError'
)<{
  message: string
  cause?: unknown
}> {}

export class MailerValidationError extends Data.TaggedError(
  'MailerValidationError'
)<{
  message: string
  cause?: unknown
}> {}

export type SendMailError =
  | MailerRenderingError
  | MailerTransportError
  | MailerValidationError
