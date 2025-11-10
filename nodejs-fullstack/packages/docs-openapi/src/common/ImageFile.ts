import { Schema } from 'effect'
import { Multipart } from '@effect/platform'

const ImageFile = Multipart.FileSchema.annotations({
  description: 'Image file'
}).pipe(
  Schema.filter(
    (file) =>
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/png' ||
      file.contentType === 'image/webp'
  )
)

export default ImageFile
