'use client'

import React from 'react'
import { useRouter } from "next/navigation";
import { Button } from '../ui/button';
import { RiArrowGoBackFill } from 'react-icons/ri'
const BackButton = () => {
    const router = useRouter()
    return (
        <Button className='w-max' variant={'outline'} onClick={() => router.back()}>
            <RiArrowGoBackFill />
        </Button>
    )
}

export default BackButton
