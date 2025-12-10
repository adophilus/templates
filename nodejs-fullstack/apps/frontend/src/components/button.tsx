import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  button: {
    backgroundColor: color.primary,
    color: color.secondary,
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    ':focus': {
      outlineColor: color.primary,
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineOffset: '2px'
    }
  }
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  stylexStyles?: stylex.StyleXStyles
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ stylexStyles, ...props }, ref) => (
    <button
      type="button"
      {...props}
      {...stylex.props(styles.button, stylexStyles)}
      ref={ref}
    />
  )
)
