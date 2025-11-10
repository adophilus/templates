import { Schema } from 'effect'
import { Multipart } from '@effect/platform'

const ImageFile = Multipart.File.pipe(
  Schema.annotations({
    description: 'Image file'
  }),
  Schema.filter(
    (file) =>
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/png' ||
      file.contentType === 'image/webp',
    { message: 'Invalid image content type' }
  )
)

export default ImageFile
