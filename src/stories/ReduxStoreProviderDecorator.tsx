import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {AppRootStateType} from "../app/store";
import {tasksReducer} from "../features/TodoListsList/tasksReducer";
import {todoListsReducer} from "../features/TodoListsList/todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todoListsAPI";
import thunk from "redux-thunk";
import {appReducer} from "../app/appReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
});

const initialGlobalState: AppRootStateType = {
    auth: {
        isLoggedIn: false
    },
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle",},
        {id: "todoListId2", title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "idle",},
    ] ,
    tasks: {
        ["todoListId1"]: [
            {description: '', title: "HTML&CSS", status: TaskStatuses.New,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId1", order: 0, addedDate: '', entityStatus: "loading",},
            {description: '', title: "JS",  status: TaskStatuses.New,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId1", order: 0, addedDate: '', entityStatus: "loading",},
        ],
        ["todoListId2"]: [
            {description: '', title: "Milk", status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId2", order: 0, addedDate: '', entityStatus: "loading",},
            {description: '', title: "React Book",  status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId2", order: 0, addedDate: '', entityStatus: "loading",},
        ],
    },
    app: {
        status: "idle",
        error: null,
        addingTodoList: false,
        isInitialized: false,
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
);
