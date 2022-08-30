import {apiSlice} from "../../app/api";
import {IProduct} from "../../model/models";

export interface IProductCreateDto {
    name: string
    price: number
    image: string
    categoryId: number
}

export interface IProductUpdateDto {
    name: string
    price: string
    image: string
    categoryId: string
}

export interface UpdateProductQueryArgs {
    id: string
    data: IProductUpdateDto
}

export interface GetProductsQueryArgs {
    filter: string,
    sort: string,
    page: number,
    size: number
}

export interface GetProductsResult {
    content: IProduct[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query<GetProductsResult, GetProductsQueryArgs>({
            query: (args: GetProductsQueryArgs) => ({
                url: '/products',
                method: 'GET',
                params: {
                    filter: args.filter,
                    sort: args.sort,
                    size: args.size,
                    page: args.page
                }
            }),
            providesTags: (result, error, arg, meta) =>
                result
                ?   [...result.content.map(({id}) => ({type: 'Product' as const, id })), 'Product'] :
                    ['Product']
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id: string) => ({
                url: `/products/${id}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        createProduct: builder.mutation<IProduct, IProductCreateDto>({
            query: (body: IProductCreateDto) => ({
                url: '/products',
                method: "POST",
                body
            }),
            invalidatesTags: ['Product']
        }),
        deleteProductById: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg, meta) => [{type: 'Product', id: arg}]
        }),
        updateProduct: builder.mutation<IProduct, UpdateProductQueryArgs>({
            query: (args: UpdateProductQueryArgs) => ({
                url: `/products/${args.id}`,
                body: {
                    name: args.data.name,
                    price: args.data.price,
                    image: args.data.image,
                    categoryId: args.data.categoryId
                },
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg, meta) => [{type: 'Product', id: arg.id}]
        })
    })
})

export const {
    useLazyGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation
} = productsApiSlice