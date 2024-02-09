export interface BillBoard{
    id: number
    storeId: string
    label: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: number
    name: string
    billboard: BillBoard
}

export interface Product {
    id: string
    name: string
    price: string
    category: Category
    isFeatured: boolean
    size: Size[]
    color: Color[]
    images: Image[]
}

export interface Size {
    id: string
    name: string
    value: string
}

export interface Color {
    id: string
    name: string
    value: string
}

export interface Image {
    id: string
    url: string
}