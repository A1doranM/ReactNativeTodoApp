import React, {useReducer, useContext} from "react";
import {TodoContext} from "./TodoContext";
import {todoReducer} from "./TodoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/ScreenContext";
import {Alert} from "react-native";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [{id: "1", title: "Выучить React Native"}],
    };

    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (title) => {
        dispatch({
            type: ADD_TODO,
            title: title,
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