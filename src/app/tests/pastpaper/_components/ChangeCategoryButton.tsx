'use client'

import React from 'react'
import { useQueryState } from 'nuqs'
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'next/navigation'
import { LucideIcon, Stethoscope, Microscope, Hospital, BookOpen, ArrowLeft } from 'lucide-react'

type Props = {
  categories: string[]
}


const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'NMCLE':
      return <Stethoscope className="w-5 h-5 mr-2" />
    case 'USMLE':
      return <Microscope className="w-5 h-5 mr-2" />
    case 'MDMS':
      return <Hospital className="w-5 h-5 mr-2" />
    case 'MBBS':
      return <BookOpen className="w-5 h-5 mr-2" />
  }
}

const ChangeCategoryButton = ({ categories }: Props) => {

  const searchParams = useSearchParams()
  const categoryInParams = searchParams.get('c')

  const [category, setCategory] = useQueryState('c', {
    defaultValue: categoryInParams || '',
    parse: (value) => value.toLowerCase() as string,
    serialize: (value) => value.toLowerCase(),
  })

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
  }

  return (
<div className="w-full p-4">
      {(!categoryInParams) ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              onClick={() => handleCategoryChange(cat)}
              className="w-full h-32 sm:h-40  flex flex-col items-center justify-center p-4 text-gray-700 dark:text-color3 hover:bg-color3 dark:hover:bg-color9 transition-colors duration-300 rounded-xl shadow-md hover:shadow-lg"
            >
              {getCategoryIcon(cat)}
              <span className="text-xl text-gray-700 font-bold text-center">{cat}</span>
            </Button>
          ))}
        </div>
      ) : (
        <Button
          onClick={() => handleCategoryChange('')}
          variant="outline"
          className="flex items-center justify-center text-gray-800 font-bold dark:text-color3 hover:bg-color3 dark:hover:bg-color9 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </Button>
      )}
    </div>
  )
}

export default ChangeCategoryButton