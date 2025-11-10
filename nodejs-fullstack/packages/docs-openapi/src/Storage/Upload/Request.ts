import { Schema } from 'effect'
import ImageFile from '@api-docs/common/ImageFile'

const Request = Schema.Struct({
  files: Schema.Array(ImageFile)
}).annotations({
  description: 'Upload media request body'
})

export default Request
