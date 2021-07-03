import {v1} from "uuid";
import {CommonActionTypeForApp, InferActionType} from "./store";
import {TodoListType} from "../api/todoListsAPI";



export type FilterValuesType = 'all' | "active" | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}


export const todoListId1: string = v1();
export const todoListId2: string = v1();
const initialState = [] as Array<TodoListDomainType>;

export type InitialTodoListStateType = typeof initialState;
export type TodoListActionType = InferActionType<typeof actionsForTodoLists>;

export const todoListsReducer = (state: InitialTodoListStateType = initialState, action: CommonActionTypeForApp)
    : InitialTodoListStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId);
        case "ADD-TODOLIST":
            return [{
                id: action.todoListId,
                title: action.title,
                filter: 'all',
                addedDate: "",
                order: 0,
            }, ...state];
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state;
    }
};

export const actionsForTodoLists = {
    removeTodoList:  (todoListId: string) => ({
        type: "REMOVE-TODOLIST",
        todoListId,
    } as const ),
    addTodoList: (title: string) => ({
        type: "ADD-TODOLIST",
        title,
        todoListId: v1(),
    } as const),
    changeTodoListTitle: (todoListId: string, title: string) => ({
        type: "CHANGE-TODOLIST-TITLE",
        todoListId,
        title,
    } as const),
    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => ({
        type: "CHANGE-TODOLIST-FILTER",
        todoListId,
        filter,
    } as const),
};


