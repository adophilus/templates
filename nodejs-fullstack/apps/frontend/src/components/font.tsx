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

export type FontVariant = keyof typeof styles

export type FontProps = ComponentProps<'span'> & {
  stylexStyles?: stylex.StyleX
}

const createFontComponent = (variant: FontVariant) =>
  forwardRef<HTMLSpanElement, FontProps>(
    ({ stylexStyles, ...props }, ref) => (
      <span {...props} {...stylex.props(styles[variant], stylexStyles)} ref={ref} />
    )
  )

type FontComponent = ReturnType<typeof createFontComponent>

const Font = new Proxy(
  {} as Record<FontVariant, FontComponent>,
  {
    get: (_, prop: string) => {
      if (!(prop in styles)) throw new Error(`Invalid Font: ${prop}`)

      const variant = prop as FontVariant

      return createFontComponent(variant)
    }
  }
)

export { Font }