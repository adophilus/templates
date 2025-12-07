import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { UploadIcon } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/button'
import { forwardRef } from 'react'

export const UploadButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ stylexStyles, ...props }, ref) => (
    <Button ref={ref} stylexStyles={stylexStyles} {...props}>
      <UploadIcon />
      <Typography.SemiboldType16>
        <Font.Body>Upload</Font.Body>
      </Typography.SemiboldType16>
    </Button>
  )
)
