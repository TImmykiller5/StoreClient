import React from 'react'
import { BillBoard as BillBoardType } from '@/types'

interface BillBoardProps{
    data:BillBoardType
}

const Billboard: React.FC<BillBoardProps> = ({
    data
}) => {
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
        <div style={{backgroundImage: `url(${data.imageUrl})`}} 
        className='relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover rounded-xl'>
            <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
                <div className='font-bold mix-blend-difference text-gray-400 text-3xl sm:text-5xl lg:text-7xl sm:max-w-xl max-w-sx'>
                    {data.label}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Billboard