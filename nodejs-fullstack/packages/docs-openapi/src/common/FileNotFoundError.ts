import { Schema } from 'effect'

class FileNotFoundError extends Schema.TaggedError<FileNotFoundError>()(
  'ERR_FILE_NOT_FOUND',
  {}
) {}

export default FileNotFoundError
