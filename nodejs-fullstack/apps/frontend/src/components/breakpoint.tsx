import * as stylex from '@stylexjs/stylex'
import type { FunctionComponent, ReactNode } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoint } from '@/styles/design/tokens.stylex'

// Extract px values from the media queries in tokens
const extractPxValue = (queryString: string): number => {
  const match = queryString.match(/(\d+)px/)
  return match ? parseInt(match[1], 10) : 0
}

// Convert stylex token values to pixel numbers
const smPx = extractPxValue(breakpoint.sm)
const mdPx = extractPxValue(breakpoint.md)
const lgPx = extractPxValue(breakpoint.lg)

// Hook to get current breakpoint
const useCurrentBreakpoint = () => {
  const isLg = useMediaQuery(`(min-width: ${lgPx}px)`)
  const isMd = useMediaQuery(`(min-width: ${mdPx}px)`)
  const isSm = useMediaQuery(`(min-width: ${smPx}px)`)

  if (isLg) return 'lg'
  if (isMd) return 'md'
  if (isSm) return 'sm'
  return 'default'
}

export type BreakpointProps = {
  children: ReactNode
  sm?: ReactNode
  md?: ReactNode
  lg?: ReactNode
}

export const Breakpoint: FunctionComponent<BreakpointProps> = ({
  children,
  sm,
  md,
  lg
}) => {
  const currentBreakpoint = useCurrentBreakpoint()

  // Determine which content to show based on current breakpoint and available props
  // The logic should show the largest available breakpoint that is active
  // If lg is available and we're at lg breakpoint, show lg
  // Else if md is available and we're at md or larger, show md
  // Else if sm is available and we're at sm or larger, show sm
  // Otherwise show children (the default content)

  if (currentBreakpoint === 'lg' && lg !== undefined) {
    return <span {...stylex.props(styles.container)}>{lg}</span>
  } else if (currentBreakpoint === 'md' && md !== undefined) {
    return <span {...stylex.props(styles.container)}>{md}</span>
  } else if (currentBreakpoint === 'sm' && sm !== undefined) {
    return <span {...stylex.props(styles.container)}>{sm}</span>
  } else {
    return <span {...stylex.props(styles.container)}>{children}</span>
  }
}

const styles = stylex.create({
  container: {
    display: 'block'
  }
})
