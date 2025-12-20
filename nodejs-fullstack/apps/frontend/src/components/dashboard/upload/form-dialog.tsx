import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { Loader2Icon, PlusIcon } from 'lucide-react'
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
import { color } from '@/styles/design/tokens.stylex'

const loadingAnimation = stylex.keyframes({
  to: {
    transform: 'rotate(360deg)'
  }
})

const styles = stylex.create({
  addFileButtonContainer: {
    paddingTop: '0.5rem'
  },
  addFileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  fieldError: {
    color: color.danger
  },
  submittingIcon: {
    animationName: loadingAnimation,
    animationTimingFunction: 'linear',
    animationDuration: '700ms',
    animationIterationCount: 'infinite'
  }
})

const UploadFile: FunctionComponent<{
  value?: File[]
  onChange: (files: File[]) => void
}> = ({ onChange, value }) => (
  <FileUploader.Provider onChange={onChange} value={value} max={5}>
    {({ files }) => (
      <FileUploader.Shell>
        <FileUploader.Placeholder />
        <FileUploader.FilesListPreview />
        {files.length > 0 && (
          <span {...stylex.props(styles.addFileButtonContainer)}>
            <FileUploader.Trigger asChild>
              <Button type="button" stylexStyles={styles.addFileButton}>
                <PlusIcon />
                <Typography.MediumType14>
                  <Font.Body>Add file</Font.Body>
                </Typography.MediumType14>
              </Button>
            </FileUploader.Trigger>
          </span>
        )}
      </FileUploader.Shell>
    )}
  </FileUploader.Provider>
)

export const UploadFormDialog: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const uploadMedia = useUploadMedia()

  const form = useForm({
    defaultValues: {
      files: [] as File[]
    },
    onSubmit: async ({ value: { files } }) => {
      const res = await uploadMedia(files)

      Exit.match(res, {
        onSuccess: () => {
          form.reset()
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

          const errorMap = {
            fields: {
              files: msg
            }
          }

          form.setErrorMap({
            onBlur: errorMap
          })
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
                <>
                  <UploadFile
                    value={field.state.value}
                    onChange={(files) => field.handleChange(() => files)}
                  />
                  <span {...stylex.props(styles.fieldError)}>
                    <Typography.MediumType12>
                      <Font.Body>
                        {field.state.meta.errors.join(', ')}
                      </Font.Body>
                    </Typography.MediumType12>
                  </span>
                </>
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
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="button"
                  onClick={() => {
                    form.handleSubmit()
                  }}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2Icon {...stylex.props(styles.submittingIcon)} />
                  ) : (
                    <Typography.MediumType14>
                      <Font.Body>Upload</Font.Body>
                    </Typography.MediumType14>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </Dialog.Confirm>
        </Dialog.Footer>
      </Dialog.Shell>
    </Dialog.Provider>
  )
}
