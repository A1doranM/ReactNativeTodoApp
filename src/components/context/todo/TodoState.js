import React, {useReducer, useContext} from "react";
import {TodoContext} from "./TodoContext";
import {todoReducer} from "./TodoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/ScreenContext";
import {Alert} from "react-native";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };

    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        const response = await fetch(
            "https://reactnativetodo-81d30.firebaseio.com/todos.json",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title})
            }
        );
        const data = await response.json();

        dispatch({
            type: ADD_TODO,
            title: title,
            id: data.name,
        });
    };

    const fetchTodos = async () => {
        const response = await fetch("https://reactnativetodo-81d30.firebaseio.com/todos.json", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        const todos = Object.keys(data).map(key => {
            return {
                ...data[key],
                id: key
            };
        });
        dispatch({
            type: FETCH_TODOS,
            todos: todos,
        });
    };

    const updateTodo = (id, title) => {
        dispatch({
            type: UPDATE_TODO,
            title: title,
            id: id
        });
    };

    const removeTodo = (id) => {
        const todo = state.todos.find(todo => todo.id === id);
        Alert.alert(
            "Delete element",
            `Are your sure want to delete "${todo.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        changeScreen(null);
                        dispatch({
                            type: REMOVE_TODO,
                            id: id,
                        });
                    }
                }
            ],
            {cancelable: false}
        );
    };

    const showLoader = () => {
        dispatch({type: SHOW_LOADER});
    };

    const hideLoader = () => {
        dispatch({type: HIDE_LOADER});
    };

    const showError = (error) => {
        dispatch({
            type: SHOW_ERROR,
            error: error,
        });
    };

    const clearError = () => {
        dispatch({type: CLEAR_ERROR});
    };

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            updateTodo,
            removeTodo,
            fetchTodos,
        }}>
            {children}
        </TodoContext.Provider>
    )
};