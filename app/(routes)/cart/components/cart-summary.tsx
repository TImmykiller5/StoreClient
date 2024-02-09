"use client"
import axios from 'axios'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Button from '@/components/ui/Button'
import Currency from '@/components/ui/currency'
import useCart from '@/hooks/use-cart'
import toast from 'react-hot-toast'



const Summary = () => {
    const items = useCart((state) => state.items)
    const clearCart = useCart((state) => state.clearCart)
    const searchParams = useSearchParams()
    const totalPrice = items.reduce((totalPrice, item) => totalPrice + Number(item.price), 0)
    const onCheckOut = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, 
        {
            productIds: items.map(item => item.id),
        })
        window.location = response.data.url
    }
    useEffect(() => {
        if(searchParams.get('success')){
            toast.success('Payment Completed')
            clearCart()
        }
        if(searchParams.get('canceled')){
            toast.error('Payment Failed')
            clearCart()
        }
    }, [searchParams, clearCart])
  return (
        <div className='h-fit sticky top-4 mt-16 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-200 py-4'>
                    <div className='text-sm font-medium text-gray-900'>
                        Order total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button disabled={!items.length} onClick={onCheckOut} className='w-full mt-6'>
                Checkout
            </Button>
        </div>
        
  )
}

export default Summary