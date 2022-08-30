export interface ICategory {
    id: number,
    name: string
}

export interface IProduct {
    id: number
    name: string
    price: number
    category: ICategory
    image: string
    createdAt: Date
}