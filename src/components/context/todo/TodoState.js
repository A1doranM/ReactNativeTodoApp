import React, {useReducer} from "react";
import {TodoContext} from "./TodoContext";
import {todoReducer} from "./TodoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [{id: "1", title: "Выучить React Native"}],
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (title) => {
        dispatch({
            type: ADD_TODO,
            title: title,
        })
    };

    const updateTodo = (id, title) => {
        dispatch({
            type: UPDATE_TODO,
            title: title,
            id: id
        })
    };

    const removeTodo = (id) => {
        dispatch({
            type: REMOVE_TODO,
            id: id,
        })
    };

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            addTodo,
            updateTodo,
            removeTodo,
        }}>
            {children}
        </TodoContext.Provider>
    )
};