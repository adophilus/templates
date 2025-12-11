import { Input } from '@/components/input'
import { Context } from './context'
import { Label } from '@/components/label'
import { Control } from './control'
import { useContext } from 'react'

export const FullName = () => {
  const { form } = useContext(Context)

  return (
    <form.Field name="full_name">
      {(field) => (
        <Control>
          <Label>Full name</Label>
          <Input
            placeholder="Mary Slessor"
            type="text"
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
