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
import Http from "../../../http";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };

    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        // const response = await fetch(
        //     "https://reactnativetodo-81d30.firebaseio.com/todos.json",
        //     {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({title})
        //     }
        // );
        // const data = await response.json();
        clearError();
        try {
            const data = await Http.post(
                "https://reactnativetodo-81d30.firebaseio.com/todos.json",
                {title}
            );

            dispatch({
                type: ADD_TODO,
                title: title,
                id: data.name,
            });
        } catch (e) {
            showError("Something wrong...");
        }
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();

        try {
            const data = await Http.get("https://reactnativetodo-81d30.firebaseio.com/todos.json");
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
        } catch (e) {
            showError("Something wrong...");
        } finally {
            hideLoader();
        }
    };

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(
                `https://reactnativetodo-81d30.firebaseio.com/todos/${id}.json`,
                {title}
            );

            dispatch({
                type: UPDATE_TODO,
                title: title,
                id: id
            });
        } catch (e) {
            showError("Something wrong when update todo");
        }
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
                    onPress: async () => {
                        clearError();
                        changeScreen(null);
                        try {
                            await Http.delete(
                                `https://reactnativetodo-81d30.firebaseio.com/todos/${id}.json`
                            );

                            dispatch({
                                type: REMOVE_TODO,
                                id: id,
                            });
                        } catch (e) {
                            showError("Something wrong when update todo");
                        }
                    }
                }
            ],
            {cancelable: false}
        );
    };

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

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