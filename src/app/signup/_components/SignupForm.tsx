'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { TBaseUser, TSignUpUser } from '@/lib/auth/schema'
import { handleSignUp } from '@/lib/auth/auth'

type Props = {
    user?: TBaseUser
}

const SignupForm = () => {
    const router = useRouter()

    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [userData, setUserData] = useState<TSignUpUser>({
        name: '',
        email: '',
        password: '',
        isSubscribed: false,
    })

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsButtonClicked(true)

        const { state, message } = await handleSignUp(userData)
        if (state === 'destructive') {
            setIsButtonClicked(false)
            return toast({
                variant: state,
                title: state.toUpperCase(),
                description: message
            })
        }

        setIsButtonClicked(false)
        toast({
            variant: 'success',
            title: 'Successful.. Redirecting Soon!',
            description: message
        })
        router.push('/profile')
        return
    }

    return (
        <div className="rounded-md bg-accent2 w-full max-w-xl p-4 space-y-5">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <form onSubmit={onSignup} id='userForm' className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label className='pb-1 font-semibold'>Name:</label>
                    <Input
                        name='name'
                        type="name"
                        defaultValue={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='pb-1 font-semibold'>Email:</label>
                    <Input
                        name='email'
                        type="email"
                        defaultValue={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='pb-1 font-semibold'>Password:</label>
                    <Input
                        name='password'
                        type="password"
                        value={userData.password || ''}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div>
                {/* <div className='flex flex-col'>
                    <label className='pb-1 font-semibold'>Role:</label>
                    <Select
                        name='role'
                        value={userData.role}
                        onValueChange={(value) => setUserData({ ...userData, role: value as TUserRole })}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLES.map((r, i) => {
                                return (
                                    <SelectItem key={i} value={r}>{r.toUpperCase()}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div> */}
                <Button type="submit">{isButtonClicked ? 'Creating..' : 'Create'}</Button>
            </form>
        </div>
    )
}

export default SignupForm