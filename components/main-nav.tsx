"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'
import { Category } from '@/types'


interface MainNavProps{
    data:Category[]
}

const MainNav:React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const routes = data.map((item) => ({
        href: `/category/${item.id}`,
        label: item.name,
        active: pathname === `/category/${item.id}`
    }))
  return (
    <nav
    className='flex mx-6 items-center space-x-4 lg:space-x-6'
    >
        {routes.map((item) => (
            <Link
            key={item.label}
            href={item.href}
            className={cn(
                'text-sm font-medium transition-colors duration-100 hover:text-black text-neutral-700',
                item.active ? 'text-black dark:text-neutral-200' : 'text-neutral-500 dark:text-neutral-500'
            )}
            >
                {item.label}
            </Link>
        ))}
    </nav>
  )
}

export default MainNav