import { Schema } from 'effect'
import MediaDescription from '../../../common/MediaDescription'

const Success = Schema.Struct({
  code: Schema.Literal('MEDIA_UPLOADED'),
  data: Schema.Array(MediaDescription)
})

export default Success
