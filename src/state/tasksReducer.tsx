import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "./store";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../api/todoListsAPI";
import {Dispatch} from "redux";

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
        case 'CREATE-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const todoListTasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case 'UPDATE-TASK': {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.id ? {...t, ...action.model} : t);
            return {...state};
        }
        case "CREATE-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODO-LISTS":{
            const copyState = {...state}
            action.todoLists.forEach((tl) => {
                copyState[tl.id] = []
            });
            return copyState;
        }
        case "SET-TASKS":
            return {...state, [action.todoListId]: action.tasks};
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
    createTask: (task: TaskType) => ({
            type: "CREATE-TASK",
        task,
    } as const),
    updateTask: (id: string, model: UpdateDomainTaskModelType, todoListId: string) => ({
        type: "UPDATE-TASK",
        id,
        model,
        todoListId,
    } as const),
    setTasks: (todoListId: string, tasks: TaskType[]) => ({
        type: "SET-TASKS",
        todoListId,
        tasks,
    } as const),
};

export const fetchTask = (todolistId: string) => (dispatch: Dispatch) => {
    todoListAPI.getTasks(todolistId)
        .then(res => {
            dispatch(actionsForTasks.setTasks(todolistId, res.data.items))
        });
};
export const removeTask = (id: string, todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.removeTask(todoListId, id)
        .then(() => {
            dispatch(actionsForTasks.removeTask(id, todoListId))
        })
};
export const createTask = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTask(todoListId, title)
        .then(res => {
            dispatch(actionsForTasks.createTask(res.data.data.item))
        })
};

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};
export const updateTask = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find( t => t.id === taskId);
    if (!task) {
        // throw new Error("task not found in the state")
        console.warn("task not found in the state")
        return;
    }
    const apiModel: UpdateTaskModelType = {
        status: task.status,
        description: task.description,
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todoListAPI.updateTask(todoListId, taskId, apiModel)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(actionsForTasks.updateTask(taskId, domainModel, todoListId))
            }

        })
};
