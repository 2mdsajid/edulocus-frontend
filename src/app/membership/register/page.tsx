import { getUserSession } from '@/lib/auth/auth'
import { constructMetadata } from '@/lib/data'
import { redirect } from 'next/navigation'
import FullSubscriptionForm from './_components/FullSubscriptionForm'

type Props = {}

export const metadata = constructMetadata({
    title: "Edulocus | Subscription",
    description: "Explore membership plan by edulocus"
})

const page =async (props: Props) => {
    const {data:user, message} = await getUserSession()
    if(!user){
        redirect('/login?ru=/membership/register')
    }

    // console.log(user)


    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-bg1  to-bg2 pt-20'>
            <FullSubscriptionForm user={user} />
        </div>
    )
}

export default page