import { forwardRef, type HTMLProps } from 'react'
import type { StyleXStyles } from '@stylexjs/stylex'

export type DialogTitleProps = HTMLProps<HTMLSpanElement> & {
  stylexStyles?: StyleXStyles
}

export const Title = forwardRef<HTMLSpanElement, DialogTitleProps>(
  ({ stylexStyles, ...props }, ref) => <span ref={ref} {...props} />
)
