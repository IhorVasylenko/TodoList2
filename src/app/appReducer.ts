import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/todoListsAPI";
import {actionsForAuth} from "../features/login/auth-reducer";


const initialState = {
    status: 'idle',
    error: null,
    addingTodoList: false,
    isInitialized: false,
} as AppInitialStateType;

export const appReducer = (state: InitialAppStateType = initialState, action: CommonActionTypeForApp): InitialAppStateType => {
    switch (action.type) {
        case "TODO/APP/SET-ERROR":
            return {...state, error: action.error};
        case "TODO/APP/SET-STATUS":
            return {...state, status: action.status};
        case "TODO/APP/ABILITY-TO-ADD-TODOLIST":
            return {...state, addingTodoList: action.ability};
        case "TODO/APP/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized};
        default:
            return state;
    }
};


// actions
export const actionsForApp = {
    setAppError: (error: string | null) => ({type: "TODO/APP/SET-ERROR", error} as const),
    setAppStatus: (status: RequestStatusType) => ({type: "TODO/APP/SET-STATUS", status} as const),
    abilityToAddTodoList: (ability: boolean) => ({type: "TODO/APP/ABILITY-TO-ADD-TODOLIST", ability} as const),
    setIsInitialized: (isInitialized: boolean) => ({type: "TODO/APP/IS-INITIALIZED", isInitialized} as const),
};


// thanks
export const initializeApp = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        let res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(actionsForAuth.setIsLoggedIn(true));
            dispatch(actionsForApp.setIsInitialized(true));
        } else {
        }
    } finally {
        dispatch(actionsForApp.setIsInitialized(true));
    }
};


// types
type InitialAppStateType = typeof initialState;
export type AppActionType = InferActionType<typeof actionsForApp>;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
    status: RequestStatusType
    error: null | string
    addingTodoList: boolean
    isInitialized: boolean

};
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionTypeForApp>;
