import {
  useEffect,
  useRef,
  useState,
  type FunctionComponent,
  type ReactNode
} from 'react'
import { Context } from './context'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  input: {
    width: '0px',
    height: '0px',
    visibility: 'hidden'
  }
})

export type ProviderProps = {
  children: ReactNode | ((context: TContext) => ReactNode)
  onChange?: (files: File[]) => void
}

export const Provider: FunctionComponent<ProviderProps> = ({
  children,
  onChange
}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange?.(files)
  }, [onChange, files])

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const contextValue = { files, setFiles, fileInputRef, removeFile }

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
          const newFilesList = [...files, ...(filesList ?? [])]
          setFiles(newFilesList)
          onChange?.(newFilesList)
          e.target.value = ''
        }}
      />
    </Context.Provider>
  )
}
