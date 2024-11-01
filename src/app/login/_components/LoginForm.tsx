'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { handleLogIn } from "@/lib/auth/auth"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {}

const LoginForm = (props: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      setIsLoading(false)
      return toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Email and password are required'
      })
    }

    const { state, message } = await handleLogIn({
      email,
      password
    })

    if (state === 'destructive') {
      setIsLoading(false)
      return toast({
        variant: state,
        title: 'Error',
        description: message
      })
    }
    
    setIsLoading(false)
    router.push('/dashboard')
  }

  return (
    <form onSubmit={onLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name='email'
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name='password'
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}

export default LoginForm