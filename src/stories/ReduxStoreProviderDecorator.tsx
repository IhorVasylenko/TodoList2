import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {AppRootStateType} from '../state/store';
import {tasksReducer} from "../state/tasksReducer";
import {todoListsReducer} from "../state/todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todoListsAPI";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
});

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", order: 0, addedDate: "",},
        {id: "todoListId2", title: "What to buy", filter: "all", order: 0, addedDate: "",},
    ] ,
    tasks: {
        ["todoListId1"]: [
            {description: '', title: "HTML&CSS", status: TaskStatuses.New,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId1", order: 0, addedDate: '',},
            {description: '', title: "JS",  status: TaskStatuses.New,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId1", order: 0, addedDate: '',},
        ],
        ["todoListId2"]: [
            {description: '', title: "Milk", status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId2", order: 0, addedDate: '',},
            {description: '', title: "React Book",  status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle, startDate: '', deadline: '', id: v1(),
                todoListId: "todoListId2", order: 0, addedDate: '',},
        ],
    },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
);
