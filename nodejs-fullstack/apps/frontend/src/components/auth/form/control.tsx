import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  control: {
    display: 'flex',
    flexDirection: 'column'
  }
})

export const Control = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, ...props }, ref) => {
  return (
    <div {...props} ref={ref} {...stylex.props(styles.control, stylexStyles)} />
  )
})
