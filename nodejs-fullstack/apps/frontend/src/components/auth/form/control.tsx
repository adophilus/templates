import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'

export const Control = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, ...props }, ref) => {
  return <div {...props} ref={ref} {...stylex.props(stylexStyles)} />
})
