import { Schema } from 'effect'
import Id from './Id'

const MediaDescription = Schema.Struct({
  source: Schema.String.annotations({ examples: ['server'] }),
  id: Id,
  url: Schema.String.annotations({
    examples: ['http://localhost:3000/f47ac10b-58cc-4372-a567-0e02b2c3d479']
  })
})

export default MediaDescription
