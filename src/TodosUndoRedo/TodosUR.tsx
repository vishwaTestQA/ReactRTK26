import React, { useEffect } from 'react'
import { useGetTodosURQuery } from './todosApi_ur'
import { useAppDispatch, useAppSelector } from '../store/store'
import { selectTodosURIds, setSearchFilter, setStatusFilter, setTodosUR } from './TodosURSlice'

import RowUR from './RowUR'

const TodosUR = () => {

  const {data: todosUR} = useGetTodosURQuery()
  const dispatch = useAppDispatch()
  
  useEffect(() => {
     dispatch(setTodosUR(todosUR ?? []))
  }, [todosUR])

  
 const ids = useAppSelector(selectTodosURIds)

 console.log(ids)
  return (
    <div>
        <input type='text' onChange={(e) => dispatch(setSearchFilter(e.target.value))}/> 
        <select onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="inCompleted">Not Completed</option>
        </select>
        {
           ids.map(id => <RowUR key={id} id={id}></RowUR>)
        }
    </div>
  )
}

export default TodosUR