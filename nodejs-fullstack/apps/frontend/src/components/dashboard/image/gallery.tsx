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
  return (
    <div {...stylex.props(styles.container)}>
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </div>
  )
}
