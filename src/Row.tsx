import React from 'react'
import { useSelector } from 'react-redux'
import { selectItemById, toggleItem } from './store/todo.slice'
import { useAppDispatch } from './store/store'

const Row = ({id}: {id:string}) => {
    const dispatch =useAppDispatch()
    const itemById = useSelector((state) => selectItemById(state, id))
  return (
    <div>
        <span>{itemById?.name}</span>
        <button onClick={() => dispatch(toggleItem(id))}>{itemById?.status}</button>
    </div>
  )
}

export default Row