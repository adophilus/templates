import { Breakpoint } from '@/components/breakpoint'
import { Button } from '@/components/button'
import { Dialog } from '@/components/dialog'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { color } from '@/styles/design/tokens.stylex'
import type MediaDescription from '@nodejs-fullstack-template/api/common/MediaDescription'
import * as stylex from '@stylexjs/stylex'
import { Trash2Icon } from 'lucide-react'
import { useRef, type FunctionComponent } from 'react'
import { useDeleteMedia } from '../upload/hooks'
import { Exit } from 'effect'
import { toast } from 'sonner'

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
  dialogImage: {
    width: '100%',
    height: '100%'
  },
  dialogDeleteButton: {
    backgroundColor: color.danger
  },
  deleteButtonContainer: {
    pointerEvents: 'none',
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
    padding: '1rem',
    alignItems: 'start',
    backgroundImage:
      'linear-gradient(to bottom, hsl(0deg 0% 0% / 0.4), transparent)',
    justifyContent: 'end',
    display: 'flex',
    transitionProperty: 'opacity',
    transitionDuration: '250ms',
    opacity: {
      default: 0,
      ':is(.group:hover span)': 1
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

export const Tile: FunctionComponent<{ data: MediaDescription }> = ({
  data
}) => {
  const imageDialogRef = useRef<HTMLDialogElement>(null)
  const deleteMedia = useDeleteMedia()

  const closeImageDialog = () => {
    imageDialogRef.current?.close()
  }

  const onDelete = async () => {
    Exit.match(await deleteMedia(data.id), {
      onFailure: () => {
        closeImageDialog()
        toast.error("Couldn't delete image")
      },
      onSuccess: () => {
        closeImageDialog()
        toast.success('Image deleted')
      }
    })
  }

  return (
    <Dialog.Provider>
      <span
        className={`group ${stylex.props(styles.container).className}`}
        style={stylex.props(styles.container).style}
      >
        <Dialog.Trigger asChild>
          <span {...stylex.props(styles.imageContainer)}>
            <img src={data.url} alt="title" {...stylex.props(styles.image)} />
          </span>
        </Dialog.Trigger>
        <Dialog.Provider>
          <span {...stylex.props(styles.deleteButtonContainer)}>
            <Dialog.Trigger asChild>
              <button type="button" {...stylex.props(styles.deleteButton)}>
                <Trash2Icon {...stylex.props(styles.deleteButtonIcon)} />
              </button>
            </Dialog.Trigger>
          </span>
          <Dialog.Shell>
            <Dialog.Title>
              <Breakpoint
                lg={
                  <Typography.MediumType20>
                    <Font.Body>Confirm</Font.Body>
                  </Typography.MediumType20>
                }
              >
                <Typography.MediumType18>
                  <Font.Body>Confirm</Font.Body>
                </Typography.MediumType18>
              </Breakpoint>
            </Dialog.Title>
            <Dialog.Body>
              <Breakpoint
                lg={
                  <Typography.MediumType16>
                    <Font.Body>
                      Are you sure you want to delete this image? Once deleted,
                      it can <strong>never</strong> be recovered
                    </Font.Body>
                  </Typography.MediumType16>
                }
              >
                <Typography.MediumType12>
                  <Font.Body>
                    Are you sure you want to delete this image? Once deleted, it
                    can <strong>never</strong> be recovered
                  </Font.Body>
                </Typography.MediumType12>
              </Breakpoint>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Cancel>
                <Typography.MediumType14>
                  <Font.Body>Cancel</Font.Body>
                </Typography.MediumType14>
              </Dialog.Cancel>
              <Dialog.Confirm asChild>
                <Button>
                  <Typography.MediumType14>
                    <Font.Body>Confirm</Font.Body>
                  </Typography.MediumType14>
                </Button>
              </Dialog.Confirm>
            </Dialog.Footer>
          </Dialog.Shell>
        </Dialog.Provider>
      </span>
      <Dialog.Shell ref={imageDialogRef}>
        <Dialog.Title>
          <Breakpoint
            lg={
              <Typography.MediumType20>
                <Font.Body>{data.id}</Font.Body>
              </Typography.MediumType20>
            }
          >
            <Typography.MediumType18>
              <Font.Body>{data.id}</Font.Body>
            </Typography.MediumType18>
          </Breakpoint>
        </Dialog.Title>
        <Dialog.Body>
          <img
            src={data.url}
            alt={data.id}
            {...stylex.props(styles.dialogImage)}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button stylexStyles={styles.dialogDeleteButton} onClick={onDelete}>
            <Typography.MediumType14>
              <Font.Body>Delete</Font.Body>
            </Typography.MediumType14>
          </Button>
          <Dialog.Cancel asChild>
            <Button>
              <Typography.MediumType14>
                <Font.Body>Close</Font.Body>
              </Typography.MediumType14>
            </Button>
          </Dialog.Cancel>
        </Dialog.Footer>
      </Dialog.Shell>
    </Dialog.Provider>
  )
}
