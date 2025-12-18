import { useSetAuth } from '@/components/auth/hooks'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_dashboard/dashboard/logout')({
  component: RouteComponent
})

function RouteComponent() {
  const setAuth = useSetAuth()

  // biome-ignore lint/correctness/useExhaustiveDependencies: I want this to execute only once
  useEffect(() => {
    setAuth({
      status: 'unauthenticated'
    })
  }, [])

  return null
}
