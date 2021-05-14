import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListsReducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tasksId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    newTitle: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    tasksId: string
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    tasksId: string
    newTitle: string
    todoListId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskTitleActionType | ChangeTaskStatusActionType
    | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.tasksId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK':{
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            const todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.tasksId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.tasksId)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
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
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (tasksId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", tasksId, todoListId}
}
export const AddTaskAC = (newTitle: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", newTitle, todoListId}
}
export const ChangeTaskStatusAC = (tasksId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", tasksId, isDone, todoListId}
}
export const ChangeTaskTitleAC = (tasksId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", tasksId, newTitle, todoListId}
}