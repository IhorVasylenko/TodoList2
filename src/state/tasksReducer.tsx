import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListsReducer";

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type AddTaskActionType = ReturnType<typeof AddTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodoListActionType | RemoveTodoListActionType

const initialState = {} as TasksStateType;
export type InitialTasksStateType = typeof initialState;

export const tasksReducer = (state: InitialTasksStateType = initialState, action: ActionType)
    : InitialTasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.tasksId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            const todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.tasksId ? {...t, isDone: action.isDone} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.tasksId ? {...t, title: action.newTitle} : t);
            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state;
    }
};

export const RemoveTaskAC = (tasksId: string, todoListId: string) => ({
    type: "REMOVE-TASK" as const, tasksId, todoListId});
export const AddTaskAC = (newTitle: string, todoListId: string) => ({
    type: "ADD-TASK" as const, newTitle, todoListId});
export const ChangeTaskStatusAC = (tasksId: string, isDone: boolean, todoListId: string) => ({
    type: "CHANGE-TASK-STATUS" as const, tasksId, isDone, todoListId});
export const ChangeTaskTitleAC = (tasksId: string, newTitle: string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE" as const, tasksId, newTitle, todoListId,});
