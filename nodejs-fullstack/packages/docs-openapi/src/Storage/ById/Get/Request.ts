import { Schema } from 'effect'
import Id from '@api-docs/common/Id'

const Request = Schema.Struct({
  fileId: Id
}).annotations({
  description: 'Get file request path parameters'
})

export default Request
