import * as stylex from '@stylexjs/stylex'
import { forwardRef, type ComponentProps } from 'react'

const styles = stylex.create({
  // Bold variants
  BoldType12: {
    fontWeight: 'bold',
    fontSize: '0.75rem' // 12px
  },
  BoldType14: {
    fontWeight: 'bold',
    fontSize: '0.875rem' // 14px
  },
  BoldType16: {
    fontWeight: 'bold',
    fontSize: '1rem' // 16px
  },
  BoldType18: {
    fontWeight: 'bold',
    fontSize: '1.125rem' // 18px
  },
  BoldType20: {
    fontWeight: 'bold',
    fontSize: '1.25rem' // 20px
  },
  BoldType24: {
    fontWeight: 'bold',
    fontSize: '1.5rem' // 24px
  },
  BoldType32: {
    fontWeight: 'bold',
    fontSize: '2rem' // 32px
  },
  BoldType36: {
    fontWeight: 'bold',
    fontSize: '2.25rem' // 36px
  },
  BoldType40: {
    fontWeight: 'bold',
    fontSize: '2.5rem' // 40px
  },
  BoldType48: {
    fontWeight: 'bold',
    fontSize: '3rem' // 48px
  },
  BoldType56: {
    fontWeight: 'bold',
    fontSize: '3.5rem' // 56px
  },
  BoldType64: {
    fontWeight: 'bold',
    fontSize: '4rem' // 64px
  },

  // Semibold variants
  SemiboldType12: {
    fontWeight: '600',
    fontSize: '0.75rem' // 12px
  },
  SemiboldType14: {
    fontWeight: '600',
    fontSize: '0.875rem' // 14px
  },
  SemiboldType16: {
    fontWeight: '600',
    fontSize: '1rem' // 16px
  },
  SemiboldType18: {
    fontWeight: '600',
    fontSize: '1.125rem' // 18px
  },
  SemiboldType20: {
    fontWeight: '600',
    fontSize: '1.25rem' // 20px
  },
  SemiboldType24: {
    fontWeight: '600',
    fontSize: '1.5rem' // 24px
  },
  SemiboldType32: {
    fontWeight: '600',
    fontSize: '2rem' // 32px
  },
  SemiboldType36: {
    fontWeight: '600',
    fontSize: '2.25rem' // 36px
  },
  SemiboldType40: {
    fontWeight: '600',
    fontSize: '2.5rem' // 40px
  },
  SemiboldType48: {
    fontWeight: '600',
    fontSize: '3rem' // 48px
  },
  SemiboldType56: {
    fontWeight: '600',
    fontSize: '3.5rem' // 56px
  },
  SemiboldType64: {
    fontWeight: '600',
    fontSize: '4rem' // 64px
  },

  // Medium variants
  MediumType12: {
    fontWeight: '500',
    fontSize: '0.75rem' // 12px
  },
  MediumType14: {
    fontWeight: '500',
    fontSize: '0.875rem' // 14px
  },
  MediumType16: {
    fontWeight: '500',
    fontSize: '1rem' // 16px
  },
  MediumType18: {
    fontWeight: '500',
    fontSize: '1.125rem' // 18px
  },
  MediumType20: {
    fontWeight: '500',
    fontSize: '1.25rem' // 20px
  },
  MediumType24: {
    fontWeight: '500',
    fontSize: '1.5rem' // 24px
  },
  MediumType32: {
    fontWeight: '500',
    fontSize: '2rem' // 32px
  },
  MediumType36: {
    fontWeight: '500',
    fontSize: '2.25rem' // 36px
  },
  MediumType40: {
    fontWeight: '500',
    fontSize: '2.5rem' // 40px
  },
  MediumType48: {
    fontWeight: '500',
    fontSize: '3rem' // 48px
  },
  MediumType56: {
    fontWeight: '500',
    fontSize: '3.5rem' // 56px
  },
  MediumType64: {
    fontWeight: '500',
    fontSize: '4rem' // 64px
  },

  // Regular variants
  RegularType12: {
    fontWeight: 'normal',
    fontSize: '0.75rem' // 12px
  },
  RegularType14: {
    fontWeight: 'normal',
    fontSize: '0.875rem' // 14px
  },
  RegularType16: {
    fontWeight: 'normal',
    fontSize: '1rem' // 16px
  },
  RegularType18: {
    fontWeight: 'normal',
    fontSize: '1.125rem' // 18px
  },
  RegularType20: {
    fontWeight: 'normal',
    fontSize: '1.25rem' // 20px
  },
  RegularType24: {
    fontWeight: 'normal',
    fontSize: '1.5rem' // 24px
  },
  RegularType32: {
    fontWeight: 'normal',
    fontSize: '2rem' // 32px
  },
  RegularType36: {
    fontWeight: 'normal',
    fontSize: '2.25rem' // 36px
  },
  RegularType40: {
    fontWeight: 'normal',
    fontSize: '2.5rem' // 40px
  },
  RegularType48: {
    fontWeight: 'normal',
    fontSize: '3rem' // 48px
  },
  RegularType56: {
    fontWeight: 'normal',
    fontSize: '3.5rem' // 56px
  },
  RegularType64: {
    fontWeight: 'normal',
    fontSize: '4rem' // 64px
  }
})

export type TypographyVariant = keyof typeof styles

export type TypographyProps = ComponentProps<'span'> & {
  stylexStyles?: stylex.StyleXStyles
}

const createTypographyComponent = (variant: TypographyVariant) =>
  forwardRef<HTMLSpanElement, TypographyProps>(
    ({ stylexStyles, ...props }, ref) => (
      <span
        {...props}
        {...stylex.props(styles[variant], stylexStyles)}
        ref={ref}
      />
    )
  )

type TypographyComponent = ReturnType<typeof createTypographyComponent>

const Typography = new Proxy(
  {} as Record<TypographyVariant, TypographyComponent>,
  {
    get: (_, prop: string) => {
      if (!(prop in styles)) throw new Error(`Invalid Typography: ${prop}`)

      const variant = prop as TypographyVariant

      return createTypographyComponent(variant)
    }
  }
)

export { Typography }
