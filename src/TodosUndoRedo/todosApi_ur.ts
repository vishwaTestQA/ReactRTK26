import { QueryStatus } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiUR = createApi({
    reducerPath: '/apiUR',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://dummyjson.com',
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['TodosUR'],
    endpoints: () => ({})
})


type TodoUR = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number
}

interface ToggleTodoURArgs {
    id: number,
    completed: boolean
}


export const todosURApi = baseApiUR.injectEndpoints({
    endpoints: (builder) => ({
        getTodosUR: builder.query<TodoUR[], void>({
            query: () => '/todos',
            providesTags: ['TodosUR']
        }),
        toggleTodoStatus: builder.mutation<TodoUR, ToggleTodoURArgs>({
            query: ({id, completed}) => ({
               url: `/todos/${id}`,
               method: 'PATCH',  // RTK Query automatically adds 'Content-Type: application/json'
               body: {completed}
            }),

            invalidatesTags: ['TodosUR'],   //This also updates UI but only after the successful updation/patch to server

            // onQueryStarted: async ({id, completed}, {dispatch, queryFulfilled}) => {
            //     const patch = dispatch(
            //         todosURApi.util.updateQueryData('getTodosUR', undefined, draft => {
            //             const item = draft.find(l => l.id === id)
            //             if(item) item.completed = completed === true
            //         })
            //     )
            //         try {
            //             await queryFulfilled
            //         } catch (error) {
            //             patch.undo()
            //         }
            // }
        })
    })
})

export const { useGetTodosURQuery, useToggleTodoStatusMutation } = todosURApi

