import { useContext, type FunctionComponent } from 'react'
import { Context } from './context'
import * as stylex from '@stylexjs/stylex'
import { FilesListPreviewItem } from './files-list-preview-item'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%'
  }
})

export const FilesListPreview: FunctionComponent = () => {
  const { files } = useContext(Context)
  return (
    <div {...stylex.props(styles.container)}>
      {files.map((file, index) => (
        <FilesListPreviewItem
          key={index}
          file={file}
          onRemove={() => null}
        />
      ))}
    </div>
  )
}
