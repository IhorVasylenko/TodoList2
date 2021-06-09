import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./state/todoListsReducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC  } from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';


export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean,
};
export type TasksStateType = {
    [key: string]: TaskPropsType[],
};
export type FilterValuesType = 'all' | "active" | 'completed';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};


export function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTodoList = useCallback ((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch]);
    const addTodoList = useCallback ((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback ((todoListId: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }, [dispatch]);
    const changeFilter = useCallback ((todoListId:  string, value: FilterValuesType) => {
        dispatch(ChangeTodoListFilterAC(todoListId, value))
    }, [dispatch]);

    const removeTask = useCallback ((taskId: string, todoListId: string) => {
        dispatch(RemoveTaskAC(taskId, todoListId))
    }, [dispatch]);
    const addTask = useCallback ((title: string, todoListId: string) => {
        dispatch(AddTaskAC(title, todoListId))
    }, [dispatch]);
    const changeTaskStatus = useCallback ((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(ChangeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch]);
    const changeTaskTitle = useCallback ((taskId: string, title: string, todoListId: string) => {
        dispatch(ChangeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static" color={"default"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        TodoLists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 10px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id]

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: "20px", borderRadius: "10px"}}>
                                        <TodoList
                                            todoListId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


