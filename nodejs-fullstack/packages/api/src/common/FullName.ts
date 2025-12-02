import { Schema } from 'effect'

const FullName = Schema.String.annotations({
  examples: ['Mary Slessor']
})

export default FullName
