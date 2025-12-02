import { Schema } from 'effect'
import { Multipart } from '@effect/platform'

const ImageFiles = Multipart.FilesSchema.pipe(
  Schema.annotations({
    description: 'Image file'
  })
)

export default ImageFiles
