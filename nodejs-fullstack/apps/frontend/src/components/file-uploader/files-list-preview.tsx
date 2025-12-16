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
  const { files, removeFile } = useContext(Context)

  return (
    <div {...stylex.props(styles.container)}>
      {files.map((file, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: using the name or webkitRelativePath would not allow multiple images of the same type to be uploaded
        <FilesListPreviewItem
          key={index}
          file={file}
          onRemove={() => removeFile(index)}
        />
      ))}
    </div>
  )
}
