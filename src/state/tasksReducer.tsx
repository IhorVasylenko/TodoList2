import {TasksStateType} from "../App";
import {v1} from "uuid";
import {CommonActionTypeForApp, InferActionType} from "./store";



const initialState = {} as TasksStateType;

export type InitialTasksStateType = typeof initialState;
export type TaskActionType = InferActionType<typeof actionsForTasks>;

export const tasksReducer = (state: InitialTasksStateType = initialState, action: CommonActionTypeForApp)
    : InitialTasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.tasksId !== action.tasksId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {tasksId: v1(), title: action.newTitle, isDone: false}
            const todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.tasksId === action.tasksId ? {...t, isDone: action.isDone} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.tasksId === action.tasksId ? {...t, title: action.newTitle} : t);
            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        default:
            return state;
    }
};


export const actionsForTasks = {
    removeTask: (tasksId: string, todoListId: string) => ({
        type: "REMOVE-TASK",
        tasksId,
        todoListId,
    } as const),
    addTask: (newTitle: string, todoListId: string) => ({
            type: "ADD-TASK",
        newTitle,
        todoListId,
    } as const),
    changeTaskStatus: (tasksId: string, isDone: boolean, todoListId: string) => ({
        type: "CHANGE-TASK-STATUS",
        tasksId,
        isDone,
        todoListId,
    } as const),
    changeTaskTitle: (tasksId: string, newTitle: string, todoListId: string) => ({
        type: "CHANGE-TASK-TITLE",
        tasksId,
        newTitle,
        todoListId,
    } as const),
}