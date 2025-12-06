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
      <Auth.Form.Container>
        <Auth.Form.Email />
        <Auth.Form.Submit />
      </Auth.Form.Container>
    </Auth.Container>
  )
}
