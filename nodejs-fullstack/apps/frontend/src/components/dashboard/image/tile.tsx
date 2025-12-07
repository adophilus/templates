import { color } from '@/styles/design/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Trash2Icon } from 'lucide-react'
import { useRef } from 'react'

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
    backgroundImage:
      'linear-gradient(to bottom, hsl(0deg 0% 0% / 0.4), transparent)',
    justifyContent: 'end',
    display: {
      default: 'none',
      ':is(.group:hover span)': 'flex'
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
  },
  deleteDialog: {
    backgroundColor: color.secondary,
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: 'min(600px, calc(100% - 2rem))',
    padding: '1rem',
    '::backdrop': {
      backgroundColor: 'hsl(0deg 0% 0% / 0.8)',
      backdropFilter: 'blur(4px)'
    }
  }
})

export const Tile = () => {
  return (
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
        <button
          type="button"
          {...stylex.props(styles.deleteButton)}
          onClick={displayDeleteDialog}
        >
          <Trash2Icon {...stylex.props(styles.deleteButtonIcon)} />
        </button>
      </span>
    </span>
  )
}
