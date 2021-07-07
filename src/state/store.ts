import {TaskActionType, tasksReducer} from "./tasksReducer";
import {TodoListActionType, todoListsReducer} from "./todoListsReducer";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type CommonActionTypeForApp = TodoListActionType | TaskActionType;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store