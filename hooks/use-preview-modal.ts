import {create} from 'zustand'
import { Product } from '@/types'

interface PreviewModalStore {
    isOpen: boolean
    data?: Product
    onOpen: (data:Product) => void
    CloseUP: () => void
}

const usePreviewModal = create<PreviewModalStore>(set => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({isOpen: true, data}),
    CloseUP: () => set({isOpen: false}),
})) 

export default usePreviewModal