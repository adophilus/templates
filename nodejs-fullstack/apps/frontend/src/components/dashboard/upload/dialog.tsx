import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/button'
import { useRef, type FunctionComponent, type ReactNode } from 'react'
import { Dialog } from '@/components/dialog'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as stylex from '@stylexjs/stylex'
import { Breakpoint } from '@/components/breakpoint'
import { FileUploader } from '@/components/file-uploader'
import { useUploadMedia } from './hooks'
import { Cause, Exit } from 'effect'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const styles = stylex.create({
  addFileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
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
            <Button type="button" stylexStyles={styles.addFileButton}>
              <PlusIcon />
              <Typography.MediumType14>
                <Font.Body>Add file</Font.Body>
              </Typography.MediumType14>
            </Button>
          </FileUploader.Trigger>
        )}
      </FileUploader.Shell>
    )}
  </FileUploader.Provider>
)

export const UploadDialog: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const toastRef = useRef<string | number>(null)

  const uploadMedia = useUploadMedia()

  const form = useForm({
    defaultValues: {
      files: [] as File[]
    },
    onSubmit: async ({ value: { files } }) => {
      toastRef.current = toast.loading('Uploading files...')

      const res = await uploadMedia(files)

      Exit.match(res, {
        onSuccess: () => {
          toast.dismiss(toastRef.current ?? undefined)
          toast.success('Files uploaded')
        },
        onFailure: (cause) => {
          let msg = 'Sorry an error occurred'

          if (Cause.isFailType(cause)) {
            switch (cause.error._tag) {
              case 'UnauthorizedError': {
                msg = 'You are not logged in'
                break
              }
              default: {
                msg = 'Sorry an error occurred'
                break
              }
            }
          }

          toast.dismiss(toastRef.current ?? undefined)
          toast.error(msg)
        }
      })
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
        <Dialog.Trigger>{children}</Dialog.Trigger>
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
              <Button type="submit">
                <Typography.MediumType14>
                  <Font.Body>Upload</Font.Body>
                </Typography.MediumType14>
              </Button>
            </Dialog.Confirm>
          </Dialog.Footer>
        </Dialog.Shell>
      </Dialog.Provider>
    </form>
  )
}
