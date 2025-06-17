import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async (props: Props) => {

    const { data: user, message: userAuthMessage } = await getUserSession()
console.log(user)
    if (!user || !ROLES_HIEARCHY.MODERATOR.includes(user.role)) {
        return <ErrorPage errorMessage='You do not have permission to access this page' />
    }


  return (
    <div>
        {props.children}
    </div>
  )
}

export default layout