import { forwardRef } from 'react'

export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return <label ref={ref} {...props} />
})
