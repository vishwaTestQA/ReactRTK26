import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo.slice";
import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux";
import { baseApi } from "./baseApi";
import { baseApiUR } from "../TodosUndoRedo/todosApi_ur";
import { todosURReducer } from "../TodosUndoRedo/TodosURSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath] : baseApi.reducer,
        [baseApiUR.reducerPath] : baseApiUR.reducer,
        todo: todoReducer,
        todosUR: todosURReducer
    },
    middleware: (getDefault) => getDefault().concat([baseApi.middleware, baseApiUR.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// here we made it as call back because useDispatch is a hook, hooks can only be called inside react component, 
// calling the hooks directly when the module loads throw invalid hook exception
// export const useAppDispatch = () => useDispatch<AppDispatch>();

//in react v9.1+ we can use .withtypes, so donot require the hook to be wrapped with () => 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); 
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector.withTypes<RootState>()  //for modern react after v9+ withTypes is needed