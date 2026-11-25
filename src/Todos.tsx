import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux'
import { selectSetStatus, setStatus, setItems, selectAllItems,setSearch, selectSetSearch, toggleItem, undo, selectFilteredIds } from './store/todo.slice'
import { useAppDispatch, useAppSelector } from './store/store'
import Row from './Row'

const Todos = () => {
    const [text, setText] = useState('')
    // const [search, setSearch] = useState('')
    const [selected, setSelected] = useState('')
    const initialText = useRef(true)
    // const [items, setItems] = useState<{id:string, name:string, status:string, value:string}[]>()
    const dispatch = useAppDispatch()

    const status = useSelector(selectSetStatus)
    const items = useSelector(selectAllItems)
    const search = useAppSelector(selectSetSearch)

    const filteredIds = useSelector(selectFilteredIds)

    console.log(status)

    const lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, animi. Ducimus tenetur voluptate commodi consectetur dolore! Aliquam corrupti aliquid fugiat magnam deleniti veniam enim omnis dolore voluptate. Consequuntur, voluptatibus magni. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, animi. Ducimus tenetur voluptate commodi consectetur dolore! Aliquam corrupti aliquid fugiat magnam deleniti veniam enim omnis dolore voluptate. Consequuntur, voluptatibus magni. consectetur dolore! Aliquam corrupti aliquid fugiat magnam deleniti veniam enim omnis dolore voluptate. Consequuntur, voluptatibus magni." 
    const arr = lorem.split(' ')

    useEffect(() => {
        dispatch(setItems(
           Array.from({length: 50}, (_,i) => ({
            id: `${i}`,
            name: `${arr[i]} todos flag ${i}`,
            status: i %2 == 0 ? 'active' : 'inactive',
            value: `${i}`
        }))
    ))
    },[])

    // useEffect(() => {
    //     if(initialText.current){
    //         setSearch(text)
    //         initialText.current = false;
    //         return;
    //     }
    //     const t = setTimeout(()=>setSearch(text), 3000)
    //     return () => clearTimeout(t)
    // }, [text])

    const debounced = useDebounce(text, 3000)


  return (
    <div>
        <input placeholder='search' onChange={e => {
            setText(e.target.value)
            dispatch(setSearch(e.target.value))
        }}/>
        <select onChange={e => dispatch(setStatus(e.target.value as any))}>
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='inactive'>inactive</option>
        </select>
        <button onClick={() => dispatch(undo())}>undo</button>
        <p>{debounced}</p>
        <p>{selected}</p>
        <p>{search}</p>

        {/* here everything will get displayed */}
        {/* {
          items?.map(v => (
             <div key={v.id}>
                <span>{v.name}</span>
                <button onClick={() => dispatch(toggleItem(v.id))}>{v.status}</button>
             </div>
            ))
        }  */}

        {/* only display the searched items */}
        {
            filteredIds?.map(id => <Row key={id} id={id}>{}</Row>)
        }
    </div>
  )
}

export default Todos