import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ProductsSearchInitialState = {
    search: IProductsSearch
}

export interface IProductsSearch {
    size: number | any
    page: number | any
    name: string | any
    minPrice: string | any
    maxPrice: string | any
    createdFrom: string | any
    createdTo: string | any
    categoryId: string | any
    sort: string | any
    direction: string | any
}

const initialState: ProductsSearchInitialState = {
    search: {
        size: 15,
        page: 0,
        name: '',
        minPrice: '',
        maxPrice: '',
        createdFrom: '',
        createdTo: '',
        categoryId: '',
        sort: 'createdAt',
        direction: 'desc'
    }
}

const productsSearchSlice = createSlice({
    name: "productsSearch",
    initialState,
    reducers: {
        setSize: (state, action: PayloadAction<number | undefined>) => {
            state.search.size = action.payload
        },
        setPage: (state, action: PayloadAction<number | undefined>) => {
            state.search.page = action.payload
        },
        setName: (state, action: PayloadAction<string | undefined>) => {
            state.search.name = action.payload
        },
        setMinPrice: (state, action: PayloadAction<string | undefined>) => {
            state.search.minPrice = action.payload
        },
        setMaxPrice: (state, action: PayloadAction<string | undefined>) => {
            state.search.maxPrice = action.payload
        },
        setCreatedFrom: (state, action: PayloadAction<Date | undefined>) => {
            state.search.createdFrom = action.payload
        },
        setCreatedTo: (state, action: PayloadAction<Date | undefined>) => {
            state.search.createdTo = action.payload
        },
        setCategoryId: (state, action: PayloadAction<string | undefined>) => {
            state.search.categoryId = action.payload
        },
        setSort: (state, action: PayloadAction<string | undefined>) => {
            state.search.sort = action.payload
        },
        setDirection: (state, action: PayloadAction<string | undefined>) => {
            state.search.direction = action.payload
        },
    }
})

export const {
    setSize,
    setPage,
    setName,
    setMinPrice,
    setMaxPrice,
    setCreatedFrom,
    setCreatedTo,
    setCategoryId,
    setSort,
    setDirection
} = productsSearchSlice.actions

export default productsSearchSlice.reducer