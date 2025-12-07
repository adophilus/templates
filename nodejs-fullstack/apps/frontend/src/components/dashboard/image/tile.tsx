import { color } from '@/styles/design/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Trash2Icon } from 'lucide-react'

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
  imageContainer: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  deleteButtonContainer: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
    padding: '1rem',
    alignItems: 'start',
    backgroundColor: 'hsl(0deg 0% 0% / 0.1)',
    justifyContent: 'end',
    display: 'none',
    ':is(.group:hover span)': {
      display: 'flex'
    }
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
  <span
    className={`group ${stylex.props(styles.container).className}`}
    style={stylex.props(styles.container).style}
  >
    <span {...stylex.props(styles.imageContainer)}>
      <img
        src="https://placehold.co/300"
        alt="title"
        {...stylex.props(styles.image)}
      />
    </span>
    <span {...stylex.props(styles.deleteButtonContainer)}>
      <button type="button" {...stylex.props(styles.deleteButton)}>
        <Trash2Icon {...stylex.props(styles.deleteButtonIcon)} />
      </button>
    </span>
  </span>
)
