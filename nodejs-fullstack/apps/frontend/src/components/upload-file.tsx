import { useRef, useState, type FunctionComponent } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Typography } from './typography'
import { Font } from './font'
import { CloudUploadIcon, PlusIcon, XIcon } from 'lucide-react'
import { Button } from './button'
import { filesize } from 'filesize'

const styles = stylex.create({
  addFileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  filePreviewContainer: { display: 'flex', gap: '1rem', width: '100%' },
  filePreviewListContainer: { display: 'flex', gap: '1rem', width: '100%' },
  filePreviewImage: {
    aspectRatio: '1 / 1',
    width: '50px'
  },
  filePreviewDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  }
})

type FilePreviewProps = {
  file: File
  onRemove: () => void
}

const FilePreview: FunctionComponent<FilePreviewProps> = ({
  file,
  onRemove
}) => {
  const fileUrl = URL.createObjectURL(file)
  const formattedSize = filesize(file.size, { standard: 'jedec' })

  return (
    <div {...stylex.props(styles.filePreviewContainer)}>
      <img
        src={fileUrl}
        alt={file.name}
        {...stylex.props(styles.filePreviewImage)}
      />
      <span {...stylex.props(styles.filePreviewDetailsContainer)}>
        <span className="font-medium">{file.name}</span>
        <Typography.MediumType12 className="text- text-heGray-foreground">
          <Font.Body>{formattedSize}</Font.Body>
        </Typography.MediumType12>
      </span>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 p-1 border-[3px] bg-white border-hePrimary text-hePrimary translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <XIcon className="w-4 h-4 stroke-[3px]" />
      </button>
    </div>
  )
}

export type FileUploaderProps = { onChange?: (files: File[]) => void }

export const FileUploader: FunctionComponent<FileUploaderProps> = ({
  onChange
}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // const isFileListEmpty = !!files.length
  const isFileListEmpty = true

  return (
    <button
      type="button"
      {...stylex.props(styles.container)}
      onClick={() => {
        if (!isFileListEmpty) fileInputRef.current?.click()
      }}
    >
      {isFileListEmpty ? (
        <div>
          <div {...stylex.props(styles.filePreviewListContainer)}>
            {files.map((file) => (
              <FilePreview
                key={file.webkitRelativePath}
                file={file}
                onRemove={() => setFiles(files.filter((f) => f !== file))}
              />
            ))}
          </div>
          <Button
            stylexStyles={styles.addFileButton}
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            <PlusIcon />
            <Typography.MediumType14>
              <Font.Body>Add file</Font.Body>
            </Typography.MediumType14>
          </Button>
        </div>
      ) : (
        <>
          <div>
            <CloudUploadIcon {...stylex.props(styles.icon)} />
          </div>
          <div>
            <Typography.MediumType12>
              <Font.Body>
                Drag a file in here or Click to select a file
              </Font.Body>
            </Typography.MediumType12>
          </div>
        </>
      )}
    </button>
  )
}
