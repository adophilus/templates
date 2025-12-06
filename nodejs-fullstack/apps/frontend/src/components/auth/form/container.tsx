import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
})

export const Container = forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, ...props }, ref) => {
  return (
    <form
      {...props}
      {...stylex.props(styles.container, stylexStyles)}
      ref={ref}
    />
  )
})
