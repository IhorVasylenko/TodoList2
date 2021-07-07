import {v1} from "uuid";
import {CommonActionTypeForApp, InferActionType} from "./store";
import {todoListAPI, TodoListType} from "../api/todoListsAPI";
import {Dispatch} from "redux";



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
        case "CREATE-TODOLIST":
            const newTodoList: TodoListDomainType = {...action.todoList, filter: "all" }
            return [newTodoList, ...state];
        case "UPDATE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "UPDATE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODO-LISTS":
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}));
        default:
            return state;
    }
};

export const actionsForTodoLists = {
    removeTodoList:  (todoListId: string) => ({
        type: "REMOVE-TODOLIST",
        todoListId,
    } as const ),
    createTodoList: (todoList: TodoListType) => ({
        type: "CREATE-TODOLIST",
        todoList,
    } as const),
    updateTodoListTitle: (todoListId: string, title: string) => ({
        type: "UPDATE-TODOLIST-TITLE",
        todoListId,
        title,
    } as const),
    updateTodoListFilter: (todoListId: string, filter: FilterValuesType) => ({
        type: "UPDATE-TODOLIST-FILTER",
        todoListId,
        filter,
    } as const),
    setTodoLists: (todoLists: TodoListType[]) => ({
        type: "SET-TODO-LISTS",
        todoLists
    } as const),
};

export const fetchTodoLists = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(actionsForTodoLists.setTodoLists(res.data))
        });
};
export const removeTodoLists = (todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.removeTodolist(todoListId)
        .then(() => {
            dispatch(actionsForTodoLists.removeTodoList(todoListId))
        });
};
export const createTodoList = (title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodolist(title)
        .then((res) => {
            dispatch(actionsForTodoLists.createTodoList(res.data.data.item))
        });
};
export const updateTodoListTitle = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoListTitle(todoListId, title)
        .then(() => {
            dispatch(actionsForTodoLists.updateTodoListTitle(todoListId, title))
        });
};


