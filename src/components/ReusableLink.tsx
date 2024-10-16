import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge';

type TypeReusableLInk = {
  link: string;
  extraClassName?: string;
  children: React.ReactNode;
}

const ReusableLInk = (props: TypeReusableLInk) => {
  return (
    <Link target='_blank' href={props.link} className={twMerge('text-blue-500 hover:underline', props.extraClassName)}>
      {props.children}
    </Link>
  )
}

export default ReusableLInk
