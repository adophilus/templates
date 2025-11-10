import { Schema } from 'effect'

const PhoneNumber = Schema.String.annotations({
  examples: ['+2348123456789']
})

export default PhoneNumber
