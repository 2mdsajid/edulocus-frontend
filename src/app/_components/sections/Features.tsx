import React from 'react'
import Image from 'next/image'
import { Book, ClipboardList, BarChart2, FileText } from 'lucide-react'

const FEATURES = [
    {
        'title': 'Books and Notes',
        'link': 'resources',
        'icon': <Book className="w-10 h-10 text-purple-600" />,
        'description': 'You can find notes of various subjects. Tips and Tricks from toppers!',
    },
    {
        'title': 'Different Tests',
        'link': 'tests',
        'icon': <ClipboardList className="w-10 h-10 text-purple-600" />,
        'description': 'You can appear different sorts of test for improvement!',
    },
    {
        'title': 'Analytics',
        'link': 'dashboard/analytics',
        'icon': <BarChart2 className="w-10 h-10 text-purple-600" />,
        'description': 'Your data will be analyzed with different graphs, charts!',
    },
    {
        'title': 'Solution Sets',
        'link': 'result',
        'icon': <FileText className="w-10 h-10 text-purple-600" />,
        'description': 'You can solution sets of questions after each test!',
    }
];

const FeatureCard: React.FC<{ feature: typeof FEATURES[0] }> = ({ feature }) => (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
        <div className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
                {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </div>
    </div>
)

const Features: React.FC = () => {
    return (
        <section className="bg-color1 py-16 px-4 md:px-10 lg:px-20 xl:px-32">
            <div className='container mx-auto'>
                <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-purple-800 font-pt-serif'>
                    What We Provide
                </h2>
                <p className='text-xl text-center font-normal max-w-3xl mx-auto mb-12 text-gray-600'>
                    We&apos;re dedicated to simplifying your journey with our comprehensive resources and support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features