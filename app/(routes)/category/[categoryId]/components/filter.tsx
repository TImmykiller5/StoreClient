"use client"

import { Color, Size } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import qs from 'query-string'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FilterProps{
    value:string
    label:string
    options:(Size | Color)[]
}

const filter:React.FC<FilterProps> = ({
    value,
    label,
    options
}) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedValue = searchParams.get(value)
    const onClick = (id:string) => {
        const current = qs.parse(searchParams.toString())
        const query = {
            ...current,
             [value]: id
        }
        if(current[value] === id){
            query[value] = null
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true})
        router.push(url)
    }
  return (
    <div className='mb-8'>
        <h3 className='text-lg font-semibold'>
            {label}
        </h3>
        <hr className="my-4" />
        <div className='flex flex-wrap gap-2'>
            {options.map(filter => (
                <div key={filter.id} className='flex items-center'>
                    <Button
                    className={cn("rounded text-sm text-gray-800 p-2 bg-white border border-gray-300 ",
                    selectedValue === filter.id && "bg-black text-white")}
                    onClick={() => onClick(filter.id)}>
                        {filter.name}
                    </Button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default filter