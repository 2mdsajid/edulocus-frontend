import { Zap } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

type Props = {}

const LiveTestCard = (props: Props) => {
  return (
    <Link href="/tests/chapterwise-series" className="block">
      <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 hover:bg-red-500/15 transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-red-500 p-3 rounded-full">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-red-600">Chapter Wise Tests Series</h3>
            <p className="text-sm text-gray-600">Join our Chapter Wise Test Series now!</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LiveTestCard