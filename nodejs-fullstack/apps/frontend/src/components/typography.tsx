import * as stylex from '@stylexjs/stylex'
import { forwardRef, type ComponentProps } from 'react'

const styles = stylex.create({
  BoldType12: {
    fontWeight: 'bold',
    fontSize: '0.75rem' // 12px
  },
  BoldType14: {
    fontWeight: 'bold',
    fontSize: '0.875rem' // 14px
  }
})

export type TypographyProps = ComponentProps<'span'> & {
  stylexStyles?: stylex.StyleXStyles
}

const Typography = new Proxy({} as Record<string, any>, {
  get: (_, prop: string) => {
    if (!(prop in styles)) throw new Error(`Invalid Typography: ${prop}`)

    const variant = prop as keyof typeof styles

    return forwardRef<HTMLSpanElement, TypographyProps>(
      ({ stylexStyles, ...props }, ref) => (
        <span {...props} {...stylex.props(styles[variant])} ref={ref} />
      )
    )
  }
})

export { Typography }
