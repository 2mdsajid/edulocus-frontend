import React from 'react'
import Image from 'next/image'
import { Book, TrendingUp, Calendar, Monitor } from 'lucide-react'

const features = [
  {
    icon: <Book className="w-8 h-8 text-color8" />,
    title: "Modules",
    description: "Structured learning paths tailored to your goals"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-color8" />,
    title: "Progress",
    description: "Track your improvement with detailed analytics"
  },
  {
    icon: <Calendar className="w-8 h-8 text-color8" />,
    title: "Plans",
    description: "Customized study plans to fit your schedule"
  },
  {
    icon: <Monitor className="w-8 h-8 text-color8" />,
    title: "AI",
    description: "AI Features to help you learn better and faster"
  }
]

type FeatureProps = {
  icon: React.ReactNode
  title: string
  description: string
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="bg-white flex flex-col items-center p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
    <div className="bg-purple-100 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-black mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
)

const FeaturesBrief: React.FC = () => {

  return (
    <section className="bg-color1 pb-16 px-4 md:px-10 lg:px-20 xl:px-32">
      <div className="container mx-auto">
        <h2 className='text-4xl pt-14 pb-4 text-center font-extrabold tracking-wider text-gray-700 font-pt-serif'>
          Our Salient Features
        </h2>
        <p className='text-xl text-center font-normal max-w-3xl mx-auto pb-16'>
          We&apos;re dedicated to simplifying your journey with our comprehensive resources and support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBrief