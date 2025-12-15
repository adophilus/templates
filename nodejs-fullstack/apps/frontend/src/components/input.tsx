import { forwardRef, type InputHTMLAttributes } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color, fontFamily } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  input: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: color.primary,
    borderRadius: '0.5rem',
    backgroundColor: color.secondary,
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontFamily: fontFamily.plusJakartaSans,
    ':focus': {
      outlineColor: color.primary,
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineOffset: '2px'
    }
  }
})

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  stylexStyles?: stylex.StyleXStyles
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ stylexStyles, ...props }, ref) => (
    <input {...props} {...stylex.props(styles.input, stylexStyles)} ref={ref} />
  )
)
