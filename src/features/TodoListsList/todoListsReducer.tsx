import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {todoListAPI, TodoListType} from "../../api/todoListsAPI";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


const initialState = [] as Array<TodoListDomainType>;
export const todoListsReducer = (state: InitialTodoListStateType = initialState, action: CommonActionTypeForApp)
    : InitialTodoListStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId);
        case "CREATE-TODOLIST":
            return [{...action.todoList, filter: "all"}, ...state];
        case "UPDATE-TODOLIST-TITLE":
            return state.map( tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl);
        case "UPDATE-TODOLIST-FILTER":
            return state.map( tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl);
        case "SET-TODO-LISTS":
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}));
        default:
            return state;
    }
};


// actions
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


// thanks
export const fetchTodoLists = (): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(actionsForTodoLists.setTodoLists(res.data))
        });
};
export const removeTodoLists = (todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.removeTodolist(todoListId)
        .then(() => {
            dispatch(actionsForTodoLists.removeTodoList(todoListId))
        });
};
export const createTodoList = (title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.createTodolist(title)
        .then((res) => {
            dispatch(actionsForTodoLists.createTodoList(res.data.data.item))
        });
};
export const updateTodoListTitle = (todoListId: string, title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.updateTodoListTitle(todoListId, title)
        .then(() => {
            dispatch(actionsForTodoLists.updateTodoListTitle(todoListId, title))
        });
};


// types
export type InitialTodoListStateType = typeof initialState;
export type TodoListActionType = InferActionType<typeof actionsForTodoLists>;
export type FilterValuesType = 'all' | "active" | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionTypeForApp>
