import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {actionsForTasks} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';
import {actionsForTodoLists} from "./state/todoListsReducer";


export type TaskPropsType = {
    tasksId: string,
    title: string,
    isDone: boolean,
};
export type TasksStateType = {
    [key: string]: TaskPropsType[],
};
export type FilterValuesType = 'all' | "active" | 'completed';
export type TodoListType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType,
};


export function App() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTodoList = useCallback ((id: string) => {
        dispatch(actionsForTodoLists.removeTodoList(id))
    }, [dispatch]);
    const addTodoList = useCallback ((title: string) => {
        dispatch(actionsForTodoLists.addTodoList(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback ((todoListId: string, title: string) => {
        dispatch(actionsForTodoLists.changeTodoListTitle(todoListId, title))
    }, [dispatch]);
    const changeFilter = useCallback ((todoListId:  string, value: FilterValuesType) => {
        dispatch(actionsForTodoLists.changeTodoListFilter(todoListId, value))
    }, [dispatch]);

    const removeTask = useCallback ((taskId: string, todoListId: string) => {
        dispatch(actionsForTasks.removeTask(taskId, todoListId))
    }, [dispatch]);
    const addTask = useCallback ((title: string, todoListId: string) => {
        dispatch(actionsForTasks.addTask(title, todoListId))
    }, [dispatch]);
    const changeTaskStatus = useCallback ((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(actionsForTasks.changeTaskStatus(taskId, isDone, todoListId))
    }, [dispatch]);
    const changeTaskTitle = useCallback ((taskId: string, title: string, todoListId: string) => {
        dispatch(actionsForTasks.changeTaskTitle(taskId, title, todoListId))
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
                            let tasksForTodoList = tasks[tl.todoListId]

                            return (
                                <Grid item key={tl.todoListId}>
                                    <Paper style={{padding: "20px", borderRadius: "10px"}}>
                                        <TodoList
                                            todoListId={tl.todoListId}
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


