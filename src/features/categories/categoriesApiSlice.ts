import {apiSlice} from "../../app/api";
import {ICategory} from "../../model/models";

const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: '/categories',
                method: 'GET'
            }),
            providesTags: ['Category']
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'GET'
            }),
            providesTags: ['Category']
        }),
        createCategory: builder.mutation<ICategory, string>({
            query: (body: string) => ({
                url: '/categories',
                method: 'POST',
                body: {
                    name: body
                }
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<ICategory, ICategory>({
            query: (category: ICategory) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: {
                    name: category.name
                }
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategories: builder.mutation<void, void>({
            query: () => ({
                url: '/categories',
                method: 'DELETE'
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategoryById: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoriesMutation,
    useDeleteCategoryByIdMutation,
} = categoriesApiSlice