import { color } from '@/styles/design/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Trash2Icon, TrashIcon } from 'lucide-react'

const styles = stylex.create({
  container: {
    display: 'grid',
    borderRadius: '1rem',
    overflow: 'hidden',
    ':focus': {
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: color.primary,
      outlineWidth: '2px'
    }
  },
  image: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2'
  },
  deleteButtonContainer: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
    display: 'flex',
    padding: '1rem',
    alignItems: 'start',
    backgroundColor: 'hsl(0deg 0% 0% / 0.1)',
    justifyContent: 'end'
  },
  deleteButton: {
    backgroundColor: color.secondary,
    borderRadius: '0.5rem',
    padding: '0.5rem',
    ':hover': {
      color: color.danger
    }
  },
  deleteButtonIcon: {
    width: '1rem',
    height: '1rem'
  }
})

export const Tile = () => (
  <button type="button" {...stylex.props(styles.container)}>
    <img
      src="https://placehold.co/300"
      alt="title"
      {...stylex.props(styles.image)}
    />
    <div {...stylex.props(styles.deleteButtonContainer)}>
      <button type="button" {...stylex.props(styles.deleteButton)}>
        <Trash2Icon {...stylex.props(styles.deleteButtonIcon)} />
      </button>
    </div>
  </button>
)
