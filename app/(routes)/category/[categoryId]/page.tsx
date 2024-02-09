import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/Container';
import { Category } from '@/types';
import React, { useEffect } from 'react'
import Filter from './components/filter';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import MobileFilters from './components/mobile-filters';



interface CategoryPageProps {
    params: {
        categoryId: string;
    };
    searchParams:{
        colorId: string;
        sizeId: string;
    }
}

const page:React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const products = await getProducts({
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
        categoryId: params.categoryId,
    })
    
    // console.log(products)
    const sizes = await getSizes()
    const colors = await getColors()
    const category = await getCategory(params.categoryId)
    // console.log(products)
  return (
    <div className='bg-white'>
        <Container>
            <Billboard data={category.billboard} />
        </Container>
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
            <div className='lg:grid  lg:grid-cols-5 lg:gap-x-8'>
                <MobileFilters sizes={sizes} colors={colors} />
                <div className='hidden lg:sticky h-fit lg:top-4 lg:block'>
                    <Filter
                        value="sizeId"
                        label="Sizes"
                        options={sizes}
                    />
                    <Filter
                        value="colorId"
                        label="Colors"
                        options={colors}
                    />
                </div>
                <div className='mt-6 lg:col-span-4 lg:mt-0'>
                    {products.length === 0 && <NoResults />}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>
                        {products.map(product => (<ProductCard key={product.id} data={product}/>))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page