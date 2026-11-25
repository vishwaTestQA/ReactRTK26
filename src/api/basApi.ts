import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com"
    }),
    tagTypes: ['Todos'],
    endpoints: () => ({})
})