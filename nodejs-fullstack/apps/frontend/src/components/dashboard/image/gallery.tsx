import { Result } from '@effect-atom/atom-react'
import { useListMedia } from '../hooks'
import { Tile } from './tile'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
  }
})

export const Gallery = () => {
  const media = useListMedia()

  return Result.builder(media)
    .onSuccess((res) => (
      <div {...stylex.props(styles.container)}>
        {res.data.map((item) => (
          <Tile key={item.id} data={item} />
        ))}
      </div>
    ))
    .orNull()
}
