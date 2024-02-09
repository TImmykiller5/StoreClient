"use client"
import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import IconButton from './icon-button'
import { Expand, ShoppingCart } from 'lucide-react'
import Currency from './currency'
import { useRouter } from 'next/navigation'
import usePreviewModal from '@/hooks/use-preview-modal'
import useCart from '@/hooks/use-cart'

interface ProductCard {
    data: Product
}



const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const cart = useCart()
    const previewModal = usePreviewModal()
    const router = useRouter()
    const handleClicks = () => {
        router.push(`/product/${data?.id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        previewModal.onOpen(data)
    }
    // const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    //     event.stopPropagation()
    //     cart.addItem(data)
    // }
  return (
    <div onClick={handleClicks} className='bg-white group cursor-pointer rounded-xl border space-y-4 pb-3'>
        {/* Images and Actions */}
        <div className='aspect-square rounded-xl bg-gray-100 relative'>
            <Image
                src={data?.images?.[0].url}
                alt={data.name}
                fill
                className='aspect-square object-cover rounded-md rounded-b-none'
            />
            <div className='opacity-0 absolute group-hover:opacity-100 transition w-full px-6 bottom-5'>
                <div className='p-3 flex gap-x-6 justify-center'>
                    <IconButton icon={<Expand size='20' className='text-gray-600'/>}  className=' ' onClick={onPreview} />
                    {/* <IconButton icon={<ShoppingCart size='20' className='text-gray-600'/>}  className=' ' onClick={onAddToCart} /> */}
                </div>
            </div>
        </div>
        {/* description */}
        <div className='px-3'>
            <p className='text-lg font-semibold text-slate-700'>
                {data.name}
            </p>
            <p className='text-sm font-medium text-slate-500'>
                {data.category?.name}
            </p>
        </div>
        {/* price */}
        <div className='px-3'>
            <Currency value={data.price}/>
        </div>
    </div>
  )
}

export default ProductCard