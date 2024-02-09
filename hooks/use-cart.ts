import {create} from 'zustand'
import { Product } from '@/types'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'

interface CartStore {
    items: products[]
    addItem: (data:products) => void
    removeItem: (id:string) => void
    clearCart: () => void
}

export interface products extends Product {
    colorSelected: string
    sizeSelected: string
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data:products) => {
            set(state => ({
                items: [...state.items, data]
            }))
            toast.success('Item added successfully to cart')
        },
        removeItem: (id:string) => {
            set(state => ({
                items: state.items.filter(item => item.id!== id)
            }))
            toast.success('Item removed successfully from cart')
        },
        clearCart: () => {
            set({
                items: []
            })
            toast.success('Cart cleared successfully')
        }
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    })
) 

export default useCart