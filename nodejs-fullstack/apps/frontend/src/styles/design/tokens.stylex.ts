import * as stylex from '@stylexjs/stylex'

export const color = stylex.defineVars({
  primary: '#0F1626',
  secondary: '#FEFFF0',
  danger: '#FF6363'
})

export const fontFamily = stylex.defineVars({
  plusJakartaSans: '"Plus Jakarta Sans", sans-serif',
  germaniaOne: '"Germania One", system-ui'
})

export const breakpoint = stylex.defineConsts({
  sm: '@media (width >= 375px)',
  md: '@media (width >= 820px)',
  lg: '@media (width >= 960px)'
})
