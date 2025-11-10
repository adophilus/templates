import { Schema } from 'effect'

const MediaDescription = Schema.Struct({
  source: Schema.String.annotations({ examples: ['server'] }),
  id: Schema.String.annotations({
    examples: ['QmXoypizjW3WknFiJnKLwL7Qh18qJnZ7qQFp2kFmCtmDZ9']
  }),
  url: Schema.String.annotations({
    examples: ['https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwL7Qh18qJnZ7qQFp2kFmCtmDZ9']
  })
})

export default MediaDescription
