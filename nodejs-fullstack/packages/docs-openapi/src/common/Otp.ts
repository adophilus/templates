import { Schema } from 'effect'

const Otp = Schema.String.annotations({
  examples: ['12345']
})

export default Otp
