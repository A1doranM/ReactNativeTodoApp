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

const handlers = {
    [ADD_TODO]: (state, {title, id}) => {
        return {
            ...state,
            todos: [
                ...state.todos,
                {
                    id: id,
                    title: title
                }
            ]
        };
    },
    [UPDATE_TODO]: (state, {id, title}) => {
        return {
            ...state, todos: state.todos.map(todo => {
                if (todo.id === id) {
                    todo.title = title;
                }
                return todo;
            })
        };
    },
    [REMOVE_TODO]: (state, {id}) => {
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        };
    },
    [SHOW_LOADER]: (state) => {
        return {
            ...state,
            loading: true,
        }
    },
    [HIDE_LOADER]: (state) => {
        return {
            ...state,
            loading: false,
        }
    },
    [SHOW_ERROR]: (state, {error}) => {
        return {
            ...state,
            error: error,
        }
    },
    [CLEAR_ERROR]: (state) => {
        return {
            ...state,
            error: null,
        }
    },
    [FETCH_TODOS]: (state, {todos}) => {
        return {
            ...state,
            todos: todos,
        }
    },
    DEFAULT: state => state,
};

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};