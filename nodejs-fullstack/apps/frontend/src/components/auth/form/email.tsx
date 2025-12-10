import { Input } from '@/components/input'
import { Context } from './context'
import { Label } from './label'
import { Control } from './control'
import { useContext, useEffect } from 'react'

export const Email = () => {
  const { form } = useContext(Context)

  useEffect(() => {
    form.setFieldValue('email', 'user@mail.com')
  }, [])

  return (
    <form.Field name="email">
      {(field) => (
        <Control>
          <Label>Email</Label>
          <Input
            placeholder="Enter your email"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        </Control>
      )}
    </form.Field>
  )
}
