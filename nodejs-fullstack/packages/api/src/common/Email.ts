import { Schema } from 'effect'

const Email = Schema.String.annotations({
  examples: ['mary.slessor@mail.com']
})

export default Email
