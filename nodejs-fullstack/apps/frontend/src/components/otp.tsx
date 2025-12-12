import {
  forwardRef,
  useRef,
  type FunctionComponent,
  type RefObject
} from 'react'
import * as stylex from '@stylexjs/stylex'
import { color, fontFamily } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    gap: '1rem',
    width: '200px'
  },
  input: {
    fieldSizing: 'content',
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

export type OtpProps = {
  length: number
  defaultValue?: string
  onChange?: (val: string) => void
}

type TRef = { els: Record<number, HTMLInputElement>; currentIndex: number }

export const Otp: FunctionComponent<OtpProps> = ({
  length,
  defaultValue,
  onChange
}) => {
  const ref = useRef<TRef>({ els: [], currentIndex: 0 })

  const computeValue = () =>
    Object.values(ref.current.els)
      .map((el) => el.value)
      .join('')

  return (
    <div {...stylex.props(styles.container)}>
      {Array.from({ length }).map((_, i) => (
        <input
          {...stylex.props(styles.input)}
          key={i}
          maxLength={1}
          defaultValue={defaultValue?.at(i)}
          ref={(el) => {
            if (el) {
              ref.current.els[i] = el
            }
          }}
          onClick={() => {
            ref.current.currentIndex = i
          }}
          onKeyUp={(e) => {
            const key = e.key
            let nextIndex: number
            if (key === 'Backspace') {
              nextIndex = (ref.current.currentIndex - 1) % length
            } else if (key === 'Delete') {
              nextIndex = ref.current.currentIndex
            } else {
              if (ref.current.currentIndex === length - 1) {
                nextIndex = ref.current.currentIndex
              } else {
                nextIndex = (ref.current.currentIndex + 1) % length
              }
            }

            ref.current.currentIndex = nextIndex
            ref.current.els[nextIndex].select()

            onChange?.(computeValue())
          }}
        />
      ))}
    </div>
  )
}
