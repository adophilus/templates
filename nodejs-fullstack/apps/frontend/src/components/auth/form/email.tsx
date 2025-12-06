import { Input } from '@/components/input'
import { Label } from './label'
import { Control } from './control'

export const Email = () => (
  <Control>
    <Label>Email</Label>
    <Input placeholder="Enter your email" />
  </Control>
)
