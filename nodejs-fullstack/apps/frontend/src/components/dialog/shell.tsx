import {
  Children,
  forwardRef,
  useContext,
  type DialogHTMLAttributes
} from 'react'
import * as stylex from '@stylexjs/stylex'
import { Context } from './context'
import { Title } from './title'
import { color } from '@/styles/design/tokens.stylex'
import { Body } from './body'
import { Footer } from './footer'

export type DialogShellProps = DialogHTMLAttributes<HTMLDialogElement> & {
  stylexStyles?: stylex.StyleXStyles
}

const styles = stylex.create({
  container: {
    backgroundColor: color.secondary,
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: 'min(600px, calc(100% - 2rem))',
    padding: '1rem'
  },
  innerContainer: {
    display: 'grid',
    gap: '1rem'
  }
})

export const Shell = forwardRef<HTMLDialogElement, DialogShellProps>(
  ({ stylexStyles, children, ...props }, ref) => {
    const { dialogRef } = useContext(Context)

    const childrenArray = Children.toArray(children)

    const title = childrenArray.find((child) => (child as any).type === Title)
    const body = childrenArray.find((child) => (child as any).type === Body)
    const footer = childrenArray.find((child) => (child as any).type === Footer)

    return (
      <dialog
        {...props}
        {...stylex.props(styles.container, stylexStyles)}
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(el)
            } else {
              ref.current = el
            }
          }
          dialogRef.current = el
        }}
      >
        <div {...stylex.props(styles.innerContainer)}>
          <div>{title}</div>
          <div>{body}</div>
          <div>{footer}</div>
        </div>
      </dialog>
    )
  }
)
