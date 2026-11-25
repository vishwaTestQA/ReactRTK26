import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
           query: () => "/users",
           providesTags: ['Users']
        })
    })
})

export const { useGetUsersQuery } = userApi