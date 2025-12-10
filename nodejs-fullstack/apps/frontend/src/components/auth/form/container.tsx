import { forwardRef, useContext } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Context } from './context'

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
  const { form } = useContext(Context)

  return (
    <form
      {...props}
      {...stylex.props(styles.container, stylexStyles)}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      ref={ref}
    />
  )
})
