'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { handleLogIn } from "@/lib/auth/auth"
import { useRouter } from 'next/navigation'
import { useState } from 'react'


type Props = {}

const LoginForm = (props: Props) => {
  const router = useRouter()
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e: any) => {
    e.preventDefault()
    setIsButtonClicked(true)

    if (!email || !password) {
      setIsButtonClicked(false)
      return toast({
        variant: 'destructive',
        title: 'WARNING',
        description: 'Credentials required'
      })
    }

    const { state, message } = await handleLogIn({
      email,
      password
    })

    // this toast will be shown when there is error[state=destructive]
    //  else the request it will be redirected to the pathname returned by the signinAction
    if (state === 'destructive') {
      setIsButtonClicked(false)
      return toast({
        variant: state,
        title: state,
        description: message
      })
    }
    
    setIsButtonClicked(false)
    router.push('/dashboard')
    return
  }


  return (
    <div className="w-full p-4 space-y-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="pb-1 font-semibold">Email:</label>
          <Input
            className=""
            name='email'
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="pb-1 font-semibold">Password:</label>
          <Input
            name='password'
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <Button
          onClick={onLogin}
          type="submit">{
            isButtonClicked
              ? '...'
              : 'Login'
          }</Button>
      </form>
    </div>
  )
}

export default LoginForm