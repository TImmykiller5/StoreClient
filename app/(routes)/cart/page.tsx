"use client"
import Container from '@/components/ui/Container'
import useCart from '@/hooks/use-cart'
import React, { useEffect, useState } from 'react'
import CartItem from './components/cart-item'
import Summary from './components/cart-summary'

const Page = () => {
  const cart = useCart()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
            Shopping Cart
          </h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 gap-x-12 lg:items-start'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 && (
              <p className='text-neutral-500'>
                Looks like you have an empty cart.
              </p>
              )}
              <ul>
                {cart.items.map(item =>(
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Page