import { createContext, type RefObject } from 'react'

export type TContext = {
  files: File[]
  setFiles: (files: File[]) => void
  removeFile: (index: number) => void
  fileInputRef: RefObject<HTMLInputElement | null>
}
export const Context = createContext<TContext>(null as unknown as TContext)
