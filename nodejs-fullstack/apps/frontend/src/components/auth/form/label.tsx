import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { forwardRef } from 'react'

export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ children, ...props }, ref) => (
  <label {...props} ref={ref}>
    <Typography.SemiboldType12>
      <Font.Body>{children}</Font.Body>
    </Typography.SemiboldType12>
  </label>
))
