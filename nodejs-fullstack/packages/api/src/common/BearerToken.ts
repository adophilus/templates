import { Schema } from 'effect'

class BearerToken extends Schema.String.annotations({
  examples: ['Bearer 01KB5EQD32KP4C52PFFWPZ4PYK']
}) {
  static make(token: string) {
    return `Bearer ${token}`
  }
}

export default BearerToken
