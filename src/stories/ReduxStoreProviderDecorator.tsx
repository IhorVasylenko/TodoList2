import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {AppRootStateType} from '../state/store';
import {tasksReducer} from "../state/tasksReducer";
import {todoListsReducer} from "../state/todoListsReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
});

const initialGlobalState = {
    todoLists: [
        {todoListId: "todoListId1", title: "What to learn", filter: "all"},
        {todoListId: "todoListId2", title: "What to buy", filter: "all"},
    ] ,
    tasks: {
        ["todoListId1"]: [
            {tasksId: v1(), title: "HTML&CSS", isDone: true},
            {tasksId: v1(), title: "JS", isDone: true},
        ],
        ["todoListId2"]: [
            {tasksId: v1(), title: "Milk", isDone: true},
            {tasksId: v1(), title: "React Book", isDone: true},
        ],
    },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
);
