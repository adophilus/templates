import { useContext, type FunctionComponent, type ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'
import { Context } from './context'

const styles = stylex.create({
  shell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    borderRadius: '0.5rem',
    borderColor: color.primary,
    borderWidth: '2px',
    borderStyle: 'dashed',
    ':focus': { outline: 'none' }
  }
})

export const Shell: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const { fileInputRef, files } = useContext(Context)

  return (
    <button
      type="button"
      {...stylex.props(styles.shell)}
      onClick={() => {
        if (!files.length) fileInputRef.current?.click()
      }}
    >
      {children}
    </button>
  )
}
