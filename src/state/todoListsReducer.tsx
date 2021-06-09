import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>;
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>;
export type ChangeTodoListTitleActionType = ReturnType<typeof ChangeTodoListTitleAC>;
export type ChangeTodoListFilterActionType = ReturnType<typeof ChangeTodoListFilterAC>;
export type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType;

export const todoListId1: string = v1();
export const todoListId2: string = v1();
const initialState = [] as Array<TodoListType>;
export type InitialTodoListStateType = typeof initialState;

export const todoListsReducer = (state: InitialTodoListStateType = initialState, action: ActionType)
    : InitialTodoListStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                id: action.todoListId,
                title: action.title,
                filter: 'all',
            }, ...state];
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state;
    }
};

export const RemoveTodoListAC = (todoListId: string) => ({type: "REMOVE-TODOLIST" as const, id: todoListId,});
export const AddTodoListAC = (newTitle: string) => ({
    type: "ADD-TODOLIST" as const, title: newTitle, todoListId: v1(),});
export const ChangeTodoListTitleAC = (todoListId: string, newTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE" as const, id: todoListId, title: newTitle,});
export const ChangeTodoListFilterAC = (todoListId: string, newFilter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER" as const, id: todoListId, filter: newFilter,});

