import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todoListsAPI";
import {Dispatch} from "redux";
import {ThunkDispatchType, ThunkType} from "./todoListsReducer";


const initialState = {} as TasksStateType;
export const tasksReducer = (state: InitialTasksStateType = initialState, action: CommonActionTypeForApp)
    : InitialTasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)};
        case 'CREATE-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? {...t, ...action.model} : t)
            };
        case "CREATE-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.todoListId];
            return stateCopy;
        case "SET-TODO-LISTS":{
            const copyState = {...state};
            action.todoLists.forEach((tl) => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case "SET-TASKS":
            return {...state, [action.todoListId]: action.tasks};
        default:
            return state;
    }
};


// actions
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


// thanks
export const fetchTask = (todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.getTasks(todoListId)
        .then(res => {
            dispatch(actionsForTasks.setTasks(todoListId, res.data.items))
        });
};
export const removeTask = (id: string, todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.removeTask(todoListId, id)
        .then(() => {
            dispatch(actionsForTasks.removeTask(id, todoListId))
        })
};
export const createTask = (todoListId: string, title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    todoListAPI.createTask(todoListId, title)
        .then(res => {
            dispatch(actionsForTasks.createTask(res.data.data.item))
        })
};
export const updateTask = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType =>
    (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
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


// types
export type InitialTasksStateType = typeof initialState;
export type TaskActionType = InferActionType<typeof actionsForTasks>;
export type TasksStateType = {
    [key: string]: TaskType[],
};
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};
