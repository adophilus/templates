import { Schema } from 'effect'

class FileNotFoundError extends Schema.TaggedError<FileNotFoundError>()(
  'FileNotFoundError',
  {}
) {}

export default FileNotFoundError
