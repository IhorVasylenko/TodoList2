import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {CommonActionTypeForApp, InferActionType} from "./store";

export const todoListId1: string = v1();
export const todoListId2: string = v1();
const initialState = [] as Array<TodoListType>;

export type InitialTodoListStateType = typeof initialState;
export type TodoListActionType = InferActionType<typeof actionsForTodoLists>;

export const todoListsReducer = (state: InitialTodoListStateType = initialState, action: CommonActionTypeForApp)
    : InitialTodoListStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.todoListId !== action.todoListId);
        case "ADD-TODOLIST":
            return [{
                todoListId: action.todoListId,
                title: action.title,
                filter: 'all',
            }, ...state];
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.todoListId === action.todoListId)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.todoListId === action.todoListId)
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


