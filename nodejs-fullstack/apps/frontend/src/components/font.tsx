import * as stylex from '@stylexjs/stylex'
import { forwardRef, type ComponentProps } from 'react'
import { fontFamily } from '../styles/design/tokens.stylex'

const styles = stylex.create({
  Body: {
    fontFamily: fontFamily.plusJakartaSans
  },
  Aesthetic: {
    fontFamily: fontFamily.germaniaOne
  }
})

export type FontProps = ComponentProps<'span'> & {
  as?: keyof JSX.IntrinsicElements
}

function createFontComponent<T extends keyof typeof styles>(
  variant: T
) {
  return forwardRef<HTMLElement, FontProps>(({ as: Component = 'span', className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={stylex(styles[variant], className)}
      />
    )
  })
}

export const Font = new Proxy({} as Record<string, any>, {
  get: (_, prop: string) => {
    if (prop in styles) {
      return createFontComponent(prop as keyof typeof styles)
    }
    return undefined
  }
})