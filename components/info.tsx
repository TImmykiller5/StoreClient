"use client"
import { Product } from '@/types'
import React from 'react'
import Currency from './ui/currency'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Button from './ui/Button'
import { ShoppingCart } from 'lucide-react'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Color, Size } from '@/types'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import toast from 'react-hot-toast'
import useCart from '@/hooks/use-cart'

const formSchema = z.object({
    size: z.string({
        required_error: 'Please select a size',
    }),

    color: z.string({
        required_error: 'Please select a color',
    }),
})

interface InfoProps{
    data:Product
}


const Info:React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const addToCart = ({
        size,
        color
    }:z.infer<typeof formSchema>) => {
        cart.addItem({...data, sizeSelected: size, colorSelected: color})
        form.reset()
    }
  return (
    <div>
        <h1 className='text-3xl font-bold text-neutral-900 '>{data.name}</h1>
        <div className='mt-3 flex items-end justify-between'>
            <p className='text-2xl font-medium text-neutral-900 '>
                <Currency value={data.price} />
            </p>
        </div>
        <hr className='my-4'/>
        <Form {...form}>
            <form className='flex flex-wrap items-center gap-x-4 w-full' onSubmit={form.handleSubmit(addToCart)}>
                <FormField 
                
                control={form.control}
                name='size'
                render={({field}) => (
                    <FormItem className='flex-[45%]'>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue className='text-neutral-500 font-semibold' placeholder='Select size' />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {data.size.map((size) => (
                                    <SelectItem key={size.id} value={size.id} >
                                        {size.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name='color'
                render={({field}) => (
                    <FormItem className='flex-[45%]'>
                        <FormLabel>Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue className='text-neutral-500 font-semibold' placeholder='Select color' />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {data.color.map((color) => (
                                    <SelectItem key={color.id} value={color.id} >
                                        <div className='flex items-center gap-x-2'>
                                            <div style={{backgroundColor: color.value}} className='w-4 h-4 rounded-full'></div><span>{color.name}</span> 
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className='mt-10 flex items-center gap-x-3'>
                    <Button type='submit' className='flex items-center gap-x-2'><ShoppingCart /> Add to cart</Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default Info