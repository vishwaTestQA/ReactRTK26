import { baseApi } from "./baseApi";

export type Todo = {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

const todosApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
          query: () => '/todos',
          providesTags: ['Todos']
        }),

        toggleItem: builder.mutation<Todo, {id: number, completed: boolean}>({
            query: ({id, completed}) => ({
                url: `/todos/${id}`,
                method: 'patch',      // RTK Query automatically adds 'Content-Type: application/json'
                body: {completed},
            }),
           
            async onQueryStarted({id, completed}, {dispatch, queryFulfilled}){
                const patch = dispatch(
                    todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
                        const item = draft.find(l => l.id === id)
                        if(item) item.completed = completed 
                    })
                );
                try {
                     queryFulfilled
                } catch (error) {
                    patch.undo()
                }
            }
        })
    }),
})

export const { useGetTodosQuery } = todosApi;