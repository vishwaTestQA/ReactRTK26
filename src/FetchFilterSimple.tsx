import { useEffect, useState } from 'react'
import { baseApi } from './store/baseApi'

type Product = {
    id: number
    title: string
}

type ProductsResponse = {
    products: Product[]
    total: number
    skip: number
    limit: number
}

const fetchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTodos1: builder.query<ProductsResponse, void>({
            query: () => "/products",
            providesTags: ['Products']
        }) 
    })
})

const {useGetTodos1Query} = fetchApi



const FetchFilter = () => {
    const {data} = useGetTodos1Query()
    const [prodData, setProdData] = useState<any>()
    const [search, setSearch] = useState<any>(null)

    useEffect(() => {
       setProdData(data?.products)
    }, [data])

  return (
    <div>
    <input type="text" onChange={e => setSearch(e.target.value)}/>
      
      <div>
        {
          search &&  data?.products.filter(d => d.title.includes(search))
                                    .map(d => <div>{d.title}</div>)
        }
      </div>
      {/* {
        data?.products.map(product => <p key={product.id}>{product.title}</p>)
      } */}
    </div>
  )
}

export default FetchFilter