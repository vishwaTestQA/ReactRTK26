import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store/store";

interface TodoURType {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

interface TodosURUIState {
    listTodosUR: TodoURType[],
    statusFilter: 'all' | 'completed' | 'incompleted',
    searchFilter: string,
}

const initialState: TodosURUIState = {
     listTodosUR: [],
     statusFilter: 'all',
     searchFilter: '',
}


const todosURSlice = createSlice({
    name: 'todosUR',
    initialState: initialState,
    reducers: ({
        setTodosUR: (state, action: PayloadAction<TodoURType[]>) => {
           state.listTodosUR = action.payload
        },

        setStatusFilter: (state, action:PayloadAction<typeof state.statusFilter>) => {
           state.statusFilter = action.payload
        },

        setTodoStatus: (state, action:PayloadAction<number>) => {
           const item = state.listTodosUR.find(l => l.id === action.payload)
           if(item) item.completed = !item.completed
        },
        setSearchFilter: (state, action:PayloadAction<string>) => {
            state.searchFilter = action.payload
        }
    }) 
})

export const { setTodosUR, setStatusFilter, setTodoStatus, setSearchFilter } = todosURSlice.actions
export const todosURReducer = todosURSlice.reducer

//selectors

const selectTodoURState = (state: RootState) => state.todosUR;

export const selectTodosURById = createSelector(
    [ (state:RootState) => state.todosUR,
      (state:RootState, id: number) => id
    ],
    (todoUR, id) => todoUR.listTodosUR.find(l => l.id === id)
)

export const selectTodosURIds = createSelector(
    [ (state: RootState) => state.todosUR.listTodosUR,
       (state: RootState) => state.todosUR.statusFilter,
       (state:RootState) => state.todosUR.searchFilter
     ],
    (list, statusFilter, searchFilter) => {
        const normalizedSearch = searchFilter.trim().toLowerCase()

        return list.filter(tdo => {
            const matchesStatus = statusFilter === 'all' ||
                tdo.completed === (statusFilter === 'completed')
            const matchesSearch = tdo.todo.toLowerCase().includes(normalizedSearch)

            return matchesStatus && matchesSearch
        }).map(tdo => tdo.id)
    }
)