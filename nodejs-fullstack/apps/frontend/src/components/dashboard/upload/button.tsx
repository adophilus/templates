import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { PlusIcon, UploadIcon } from 'lucide-react'
import {
  Button as CButton,
  type ButtonProps as CButtonProps
} from '@/components/button'
import { forwardRef, useRef, type FunctionComponent } from 'react'
import { Dialog } from '@/components/dialog'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'
import { Breakpoint } from '@/components/breakpoint'
import { FileUploader } from '@/components/file-uploader'

export type ButtonProps = Omit<CButtonProps, 'children'>

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const styles = stylex.create({
  addFileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  buttonIcon: {
    width: { default: '1rem', [breakpoint.lg]: '1.5rem' },
    height: { default: '1rem', [breakpoint.lg]: '1.5rem' }
  },
  input: {
    width: '100%'
  }
})

const UploadFile: FunctionComponent<{ onChange: (files: File[]) => void }> = ({
  onChange
}) => (
  <FileUploader.Provider onChange={onChange}>
    {({ files }) => (
      <FileUploader.Shell>
        <FileUploader.Placeholder />
        <FileUploader.FilesListPreview />
        {files.length > 0 && (
          <FileUploader.Trigger>
            <CButton type="button" stylexStyles={styles.addFileButton}>
              <PlusIcon />
              <Typography.MediumType14>
                <Font.Body>Add file</Font.Body>
              </Typography.MediumType14>
            </CButton>
          </FileUploader.Trigger>
        )}
      </FileUploader.Shell>
    )}
  </FileUploader.Provider>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const toastRef = useRef<string | number>(null)

    const uploadFiles = (_files: File[]) => sleep(5000)

    const form = useForm({
      defaultValues: {
        files: [] as File[]
      },
      onSubmit: async ({ value: { files } }) => {
        toast.loading('Upload files')
        await uploadFiles(files)
        if (toastRef.current) toast.dismiss(toastRef.current)
        toast.success('Files uploaded')
      }
    })

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Dialog.Provider open={true}>
          <Dialog.Trigger>
            <CButton {...props} ref={ref}>
              <UploadIcon {...stylex.props(styles.buttonIcon)} />
              <Breakpoint
                lg={
                  <Typography.SemiboldType16>
                    <Font.Body>Upload</Font.Body>
                  </Typography.SemiboldType16>
                }
              >
                <Typography.SemiboldType12>
                  <Font.Body>Upload</Font.Body>
                </Typography.SemiboldType12>
              </Breakpoint>
            </CButton>
          </Dialog.Trigger>
          <Dialog.Shell>
            <Dialog.Title>
              <Breakpoint
                lg={
                  <Typography.MediumType20>
                    <Font.Body>Upload Image</Font.Body>
                  </Typography.MediumType20>
                }
              >
                <Typography.MediumType18>
                  <Font.Body>Upload Image</Font.Body>
                </Typography.MediumType18>
              </Breakpoint>
            </Dialog.Title>
            <Dialog.Body>
              <form.Field name="files">
                {(field) => (
                  <UploadFile
                    onChange={(files) => {
                      field.handleChange(() => files)
                    }}
                  />
                )}
              </form.Field>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Cancel>
                <Typography.MediumType14>
                  <Font.Body>Cancel</Font.Body>
                </Typography.MediumType14>
              </Dialog.Cancel>
              <Dialog.Confirm>
                <CButton type="submit">
                  <Typography.MediumType14>
                    <Font.Body>Upload</Font.Body>
                  </Typography.MediumType14>
                </CButton>
              </Dialog.Confirm>
            </Dialog.Footer>
          </Dialog.Shell>
        </Dialog.Provider>
      </form>
    )
  }
)
