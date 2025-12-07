import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { UploadIcon } from 'lucide-react'
import {
  Button as CButton,
  type ButtonProps as CButtonProps
} from '@/components/button'
import { forwardRef, useRef } from 'react'
import { Dialog } from '@/components/dialog'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

export type ButtonProps = Omit<CButtonProps, 'children'>

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const toastRef = useRef<string | number>(null)

    const uploadFiles = (files: File[]) => sleep(5000)

    const form = useForm({
      defaultValues: {
        files: [] as File[]
      },
      onSubmit: async ({ value: { files } }) => {
        toast.loading('Upload files')
        await uploadFiles(files)
        toast.dismiss(toastRef.current!)
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
        <Dialog.Provider>
          <Dialog.Trigger>
            <CButton {...props} ref={ref}>
              <UploadIcon />
              <Typography.SemiboldType16>
                <Font.Body>Upload</Font.Body>
              </Typography.SemiboldType16>
            </CButton>
          </Dialog.Trigger>
          <Dialog.Shell>
            <Dialog.Title>Upload Image</Dialog.Title>
            <Dialog.Body>
              <form.Field name="files">
                {(field) => (
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const files = e.target.files

                      if (!files) {
                        field.handleChange(() => [])
                        return
                      }

                      field.handleChange(() => [...files])
                    }}
                  />
                )}
              </form.Field>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Cancel>Cancel</Dialog.Cancel>
              <Dialog.Confirm>
                <CButton type="submit">Upload</CButton>
              </Dialog.Confirm>
            </Dialog.Footer>
          </Dialog.Shell>
        </Dialog.Provider>
      </form>
    )
  }
)
