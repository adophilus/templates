import { Input, type InputProps } from '@/components/input'
import { forwardRef, useContext, useEffect } from 'react'
import { Context } from './context'

export type HiddenProps = Omit<InputProps, 'name'> & {
  name: string
}

export const Hidden = forwardRef<HTMLInputElement, HiddenProps>(
  ({ name, value, ...props }, ref) => {
    const { form } = useContext(Context)

    useEffect(() => {
      form.setFieldValue(name, value)
    }, [form, name, value])

    return (
      <form.Field name={name}>
        {(field) => {
          return (
            <Input
              id={name}
              name={name}
              {...props}
              type="hidden"
              value={field.state.value}
              ref={ref}
            />
          )
        }}
      </form.Field>
    )
  }
)
