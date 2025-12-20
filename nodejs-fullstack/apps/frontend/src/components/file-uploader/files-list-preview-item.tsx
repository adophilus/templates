import type { FunctionComponent } from 'react'
import { filesize } from 'filesize'
import * as stylex from '@stylexjs/stylex'
import { Typography } from '../typography'
import { Font } from '../font'
import { Trash2Icon } from 'lucide-react'
import { color } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  addFileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  container: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    alignItems: 'stretch'
  },
  image: {
    aspectRatio: '1 / 1',
    width: '50px',
    objectFit: 'cover',
    borderRadius: '0.5rem'
  },
  detailsContainer: {
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between'
  },
  removeButton: {
    flexShrink: 0,
    transition: 'color',
    transitionDuration: '250ms',
    ':hover': {
      color: color.danger
    }
  },
  fileName: {
    textOverflow: 'ellipsis'
  }
})

type FilesListPreviewItemProps = {
  file: File
  onRemove: () => void
}

export const FilesListPreviewItem: FunctionComponent<
  FilesListPreviewItemProps
> = ({ file, onRemove }) => {
  const fileUrl = URL.createObjectURL(file)
  const formattedSize = filesize(file.size, { standard: 'jedec' })

  return (
    <div {...stylex.props(styles.container)}>
      <img src={fileUrl} alt={file.name} {...stylex.props(styles.image)} />
      <span {...stylex.props(styles.detailsContainer)}>
        <Typography.MediumType16>
          <Font.Body stylexStyles={styles.fileName}>{file.name}</Font.Body>
        </Typography.MediumType16>
        <Typography.MediumType12>
          <Font.Body>{formattedSize}</Font.Body>
        </Typography.MediumType12>
      </span>
      <button
        type="button"
        onClick={onRemove}
        {...stylex.props(styles.removeButton)}
      >
        <Trash2Icon />
      </button>
    </div>
  )
}
