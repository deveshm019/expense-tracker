import {createApi, fetchBaseQuery} from'@reduxjs/toolkit/query/react'

const baseURL = 'http://localhost:5000'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: builder=>({
        getCategories: builder.query({
            query:()=>'/api/categories',
            providesTags:['categories']
        }),
        getLabels: builder.query({
            query: ()=>'/api/labels',
            providesTags:['transaction']
        }),
        addTransaction: builder.mutation({
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method: 'POST',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: (recordID)=>({
                url: '/api/transaction',
                method: 'DELETE',
                body: recordID
            }),
            invalidatesTags: ['transaction']
        }),
        
    })
})

export default apiSlice;