import ErrorPage from '@/components/reusable/ErrorPage';
import { askGemini } from '@/lib/actions/google.actions';
import React from 'react'
import AiReportRender from './_components/AiReportRender';

type Props = {}

const page = async (props: Props) => {

    const { data, message } = await askGemini();
    if(!data){
        return <ErrorPage errorMessage={message} />;
    }

  return (
    <div className='w-full min-h-screen bg-color1 mx-auto space-y-5 pt-24 pb-16 px-4 md:px-10 lg:px-20 xl:px-32'>
        <AiReportRender markdownText={data} />
        <p className='text-xs font-bold tracking-wider italic'>**AI Generated ( Gemini Flash 1.5 ) - might not be 100% accurate</p>
    </div>
  )
}

export default page