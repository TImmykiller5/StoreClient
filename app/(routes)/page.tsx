import getBillboard from '@/actions/get-billboards'
import getProducts from '@/actions/get-products'
import Billboard from '@/components/billboard'
import ProductList from '@/components/product-list'
import Container from '@/components/ui/Container'
import React from 'react'

const HomePage = async () => {
  const billboard = await getBillboard('ad1281d6-4c22-4a85-a8de-6472dc553a13')
  const products = await getProducts({isFeatured: true})
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        {/*  */}
        <Billboard data={billboard}/>
      <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
        <ProductList title={'Featured Products'} items={products} />
      </div>
      </div>

    </Container>
  )
}

export default HomePage