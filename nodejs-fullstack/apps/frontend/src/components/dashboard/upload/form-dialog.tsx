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

export const UploadFormDialog: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const toastRef = useRef<string | number>(null)

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const uploadMedia = useUploadMedia()

  const form = useForm({
    defaultValues: {
      files: [] as File[]
    },
    onSubmit: async ({ value: { files } }) => {
      console.log(files)
      toastRef.current = toast.loading('Uploading files...')

      const res = await uploadMedia(files)

      Exit.match(res, {
        onSuccess: () => {
          toast.dismiss(toastRef.current ?? undefined)
          closeDialog()
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
    <Dialog.Provider>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Shell ref={dialogRef}>
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <form.Field name="files">
              {(field) => (
                <UploadFile
                  onChange={(files) => {
                    console.log(files)
                    field.handleChange(() => files)
                  }}
                />
              )}
            </form.Field>
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Cancel>
            <Typography.MediumType14>
              <Font.Body>Cancel</Font.Body>
            </Typography.MediumType14>
          </Dialog.Cancel>
          <Dialog.Confirm disableDefaultBehavior asChild>
            <Button
              type="button"
              onClick={() => {
                form.handleSubmit()
              }}
            >
              <Typography.MediumType14>
                <Font.Body>Upload</Font.Body>
              </Typography.MediumType14>
            </Button>
          </Dialog.Confirm>
        </Dialog.Footer>
      </Dialog.Shell>
    </Dialog.Provider>
  )
}
