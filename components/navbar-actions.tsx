"use client"

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { ShoppingBag } from 'lucide-react'
import useCart from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cart = useCart()
    const router = useRouter()

    if (!isMounted) {
        return null
    }

  return (
    <div className='ml-auto flex items-center gap-x-4'>
        <Button onClick={() => router.push('/cart')} className='flex items-center bg-black rounded-full px-4 py-2'>
            <ShoppingBag
            size={20}
            color='white'
            />
            <span className='text-white ml-2 font-medium text-sm'>
                {cart.items.length}
            </span>
        </Button>
    </div>
  )
}

export default NavbarActions