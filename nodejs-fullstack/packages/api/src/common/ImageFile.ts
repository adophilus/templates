import { Schema } from 'effect'
import * as Multipart from '@effect/platform/Multipart'

const ImageFile = Multipart.FileSchema.pipe(
  Schema.annotations({
    description: 'Image file'
  })
)

export default ImageFile
