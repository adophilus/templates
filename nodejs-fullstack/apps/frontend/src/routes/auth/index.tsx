import { Auth } from '@/components/auth'
import { Input } from '@/components/input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Auth.Container>
      <Auth.LoginHeader />
      <Auth.Form.Control>
        <Auth.Form.Label>Email</Auth.Form.Label>
        <Input placeholder="Enter your email" />
      </Auth.Form.Control>
    </Auth.Container>
  )
}
