import { useRef, type FunctionComponent, type ReactNode } from 'react'
import { Context, type TContext } from './context'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  input: {
    width: '0px',
    height: '0px',
    position: 'absolute',
    visibility: 'hidden'
  }
})

export type ProviderProps = {
  children: ReactNode | ((context: TContext) => ReactNode)
  value?: File[]
  onChange?: (files: File[]) => void
  max?: number
}

export const Provider: FunctionComponent<ProviderProps> = ({
  children,
  value = [],
  max,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  const contextValue: TContext = {
    files: value,
    setFiles: (files) => {
      onChange?.(files)
    },
    fileInputRef,
    removeFile,
    max
  }

  return (
    <Context.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        {...stylex.props(styles.input)}
        onChange={(e) => {
          const filesList = e.target.files
          const newFilesList = [...value, ...(filesList ?? [])]
          onChange?.(newFilesList)
          e.target.value = ''
        }}
      />
    </Context.Provider>
  )
}
