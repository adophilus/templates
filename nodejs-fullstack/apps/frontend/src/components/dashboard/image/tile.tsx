import { Button } from '@/components/button'
import { Dialog } from '@/components/dialog'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
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
    },
    ':hover': {
      cursor: 'pointer'
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
  deleteDialog: {}
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
      <Dialog.Provider>
        <span {...stylex.props(styles.deleteButtonContainer)}>
          <Dialog.Trigger>
            <button type="button" {...stylex.props(styles.deleteButton)}>
              <Trash2Icon {...stylex.props(styles.deleteButtonIcon)} />
            </button>
          </Dialog.Trigger>
        </span>
        <Dialog.Shell>
          <Dialog.Title>
            <Typography.MediumType24>
              <Font.Body>Confirm</Font.Body>
            </Typography.MediumType24>
          </Dialog.Title>
          <Dialog.Body>
            <Typography.MediumType16>
              <Font.Body>
                Are you sure you want to delete this image? Once deleted, it can{' '}
                <strong>never</strong> be recovered
              </Font.Body>
            </Typography.MediumType16>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Cancel>Cancel</Dialog.Cancel>
            <Dialog.Confirm>
              <Button>Confirm</Button>
            </Dialog.Confirm>
          </Dialog.Footer>
        </Dialog.Shell>
      </Dialog.Provider>
    </span>
  )
}
