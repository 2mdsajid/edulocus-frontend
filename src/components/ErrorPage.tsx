import React from 'react'

type Props = {
    errorMessage: string
}

const ErrorPage = (props: Props) => {
  return (
    <div className='w-full min-h-[100vh] pt-16 '>{props.errorMessage ? props.errorMessage : 'Some Error Occured!'}</div>
  )
}

export default ErrorPage