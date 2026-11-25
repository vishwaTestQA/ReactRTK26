import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { shallowEqual, useDispatch } from "react-redux";
import type { RootState } from "./store";

type Item = {
    id: string,
    name: string,
    status: 'active' | 'inactive'
    value: string
}

type ListState = {
    list: Item[],
    statusFilter: 'all' | 'active' | 'inactive',
    search: string,
    history: Item[][]; // Simple snapshot undo stack
}

const initialState: ListState = {
    list: [],
    statusFilter: 'all',
    search: '',
    history: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState:  initialState,
    reducers: {
        setStatus: (state: ListState, action: PayloadAction<'all' | 'active' | 'inactive'>) => {
            state.statusFilter = action.payload
        },

        setItems: (state: ListState, action: PayloadAction<Item[]>) => {
            state.list = action.payload
        },

        setSearch: (state: ListState, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        toggleItem: (state, action: PayloadAction<string>) => {
            state.history.push(JSON.parse(JSON.stringify(state.list)))  //first keeping the snapshot before toggling
            const item = state.list.find(l => l.id === action.payload)
            if(item) item.status = item.status === 'active' ? 'inactive' : 'active'
        },
        undo: (state) => {
          const prevState = state.history.pop()
          if(prevState) state.list = prevState;
        }
    }
})

export const {setStatus, setItems, setSearch,toggleItem, undo} = todoSlice.actions
export const todoReducer = todoSlice.reducer 

const stateTodo = (state: {todo: ListState}) => state.todo

export const selectSetStatus = createSelector(
    (state: {todo: ListState}) => state.todo,
    (todo) => todo.statusFilter
)

export const selectAllItems = createSelector(
    (state: {todo: ListState}) => state.todo,
    (todo) => todo.list
)

export const selectSetSearch = createSelector(
    [stateTodo],
    (todo) => todo.search
)

export const selectItemById = createSelector(
    [ (state: RootState) => state.todo.list,
      (state: RootState, id:string) => id  
    ],
    (list, id) => list.find(l => l.id === id)
)

export const selectFilteredIds = createSelector(
    [
        (state: {todo: ListState}) => state.todo.list,
        (state: {todo: ListState}) => state.todo.search,
        (state: {todo: ListState}) => state.todo.statusFilter, 
    ],
    (list, searchFilter, statusfilter) => list.filter(l => l.name.includes(searchFilter) && ( statusfilter === 'all' || statusfilter === l.status))
                                              .map(i => i.id),
  { memoizeOptions: { resultEqualityCheck: shallowEqual } }
)