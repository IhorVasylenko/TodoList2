import {v1} from "uuid";
import {CommonActionTypeForApp, InferActionType} from "./store";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todoListsAPI";

export type TasksStateType = {
    [key: string]: TaskType[],
};

const initialState = {} as TasksStateType;

export type InitialTasksStateType = typeof initialState;
export type TaskActionType = InferActionType<typeof actionsForTasks>;

export const tasksReducer = (state: InitialTasksStateType = initialState, action: CommonActionTypeForApp)
    : InitialTasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.id)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                description: '',
                title: action.newTitle,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.todoListId,
                order: 0,
                addedDate: '',}
            const todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.id ? {...t, status: action.status} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.id ? {...t, title: action.newTitle} : t);
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
    removeTask: (id: string, todoListId: string) => ({
        type: "REMOVE-TASK",
        id,
        todoListId,
    } as const),
    addTask: (newTitle: string, todoListId: string) => ({
            type: "ADD-TASK",
        newTitle,
        todoListId,
    } as const),
    changeTaskStatus: (id: string, status: TaskStatuses, todoListId: string) => ({
        type: "CHANGE-TASK-STATUS",
        id,
        status,
        todoListId,
    } as const),
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => ({
        type: "CHANGE-TASK-TITLE",
        id,
        newTitle,
        todoListId,
    } as const),
}