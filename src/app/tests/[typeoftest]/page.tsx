import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params:{
    typeoftest: string
  }
}

const page = (props: Props) => {
  redirect('/tests')
  return (
    <div>{props.params.typeoftest}</div>
  )
}

export default page