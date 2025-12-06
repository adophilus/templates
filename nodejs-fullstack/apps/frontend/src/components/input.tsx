import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  input: {
    border: '2px solid #0F1626',
    borderRadius: '0.5rem',
    backgroundColor: '#FEFFED',
    padding: '0.5rem 1rem'
  }
})

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, ...props }, ref) => (
  <input {...props} {...stylex.props(styles.input, stylexStyles)} ref={ref} />
))
