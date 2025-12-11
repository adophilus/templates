import { Context } from './context'
import { Otp as COtp } from '@/components/otp'
import { Control } from './control'
import { useContext } from 'react'

export const Otp = () => {
  const { form } = useContext(Context)

  return (
    <form.Field name="otp">
      {(field) => (
        <Control>
          <COtp
            defaultValue={field.state.value}
            length={5}
            onChange={(value) => field.handleChange(value)}
          />
        </Control>
      )}
    </form.Field>
  )
}
