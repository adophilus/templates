import { Data } from 'effect'

export class MailerError extends Data.TaggedError('MailerError')<{}> { }
