import React from 'react'

type Props = {}

const FeaturesBrief = (props: Props) => {
    return (
<div className="py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:-mt-28 xl:grid-cols-4 gap-6 px-6 py-10">
    <div className="bg-accent3 flex items-center justify-start p-2 border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src="/features/modules.jpg" alt="Modules" className="w-28 h-28 mr-4" />
        <p className="text-lg leading-4">Modules</p>
      </div>
    </div>

    <div className="bg-accent3 flex items-center justify-start p-2 border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src="/features/progress.jpg" alt="Progress" className="w-28 h-28 mr-4" />
        <p className="text-lg leading-4">Progress</p>
      </div>
    </div>

    <div className="bg-accent3 flex items-center justify-start p-2 border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src="/features/plans.jpg" alt="Plans" className="w-28 h-28 mr-4" />
        <p className="text-lg leading-4">Plans</p>
      </div>
    </div>

    <div className="bg-accent3 flex items-center justify-start p-2 border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src="/features/simulation.jpg" alt="Simulations" className="w-28 h-28 mr-4" />
        <p className="text-lg leading-4">Simulations</p>
      </div>
    </div>
  </div>
</div>



    )
}

export default FeaturesBrief