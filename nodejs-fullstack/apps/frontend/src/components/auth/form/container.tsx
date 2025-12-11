import { forwardRef, useContext } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Context } from './context'
import { Submit } from './submit'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  }
})

export const Container = forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, children, ...props }, ref) => {
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
    >
      <div {...stylex.props(styles.innerContainer)}>{children}</div>
      <Submit />
    </form>
  )
})
