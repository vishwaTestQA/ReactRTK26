import React from 'react'
import { useAppDispatch, useAppSelector, type RootState } from '../store/store'
import { selectTodosURById, setTodoStatus } from './TodosURSlice'
import { useToggleTodoStatusMutation } from './todosApi_ur'


const RowUR = ({ id }: { id: number }) => {

  const dispatch = useAppDispatch()
  const todosURById = useAppSelector((state: RootState) => selectTodosURById(state, id))
  const [toggleTodoStatus] = useToggleTodoStatusMutation()

  const handleToggleStatus = () => {
    setTimeout(() => toggleTodoStatus({id, completed: !todosURById?.completed}), 3000)
  }

  return (
    <div style={{ height: "70px", border: 'solid 1px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <span style={{ width: "50%" }}>{todosURById?.todo}</span>
      <button
        // onClick={() => dispatch(setTodoStatus(id))}
        onClick={handleToggleStatus}
        style={{ width: '120px' }}
      >
        {todosURById?.completed ? 'completed' : 'Not completed'}
      </button>
    </div>
  )
}

export default RowUR