import { Schema } from 'effect'
import * as Multipart from '@effect/platform/Multipart'

const ImageFiles = Multipart.FilesSchema.pipe(
  Schema.annotations({
    description: 'Image file'
  })
)

export default ImageFiles
