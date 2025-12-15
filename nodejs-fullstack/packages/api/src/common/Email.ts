import { Schema } from 'effect'

const Email = Schema.String.pipe(
  Schema.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
).annotations({
  examples: ['mary.slessor@mail.com']
})

export default Email
