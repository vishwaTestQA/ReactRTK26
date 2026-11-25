import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Test1 from './components/Test1'
import Todos from './Todos'
import FetchFilter from './FetchFilterSimple'
import TodosUR from './TodosUndoRedo/TodosUR'

function App() {

  return (
    <>
      <div>React</div>
      {/* <Test1/> */}
      {/* <Todos/> */}
      {/* <FetchFilter/> */}
      <TodosUR/>
    </>
  )
}

export default App
