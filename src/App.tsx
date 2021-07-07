import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {actionsForTasks, TasksStateType} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';
import {actionsForTodoLists, fetchTodoLists, FilterValuesType, TodoListDomainType} from "./state/todoListsReducer";
import {TaskStatuses, todoListAPI} from "./api/todoListsAPI";


export function App() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => {
       return  state.todoLists
    });
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);

    const removeTodoList = useCallback ((todoListId: string) => {
        dispatch(actionsForTodoLists.removeTodoList(todoListId))
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

    const removeTask = useCallback ((id: string, todoListId: string) => {
        dispatch(actionsForTasks.removeTask(id, todoListId))
    }, [dispatch]);
    const addTask = useCallback ((title: string, todoListId: string) => {
        dispatch(actionsForTasks.addTask(title, todoListId))
    }, [dispatch]);
    const changeTaskStatus = useCallback ((id: string, status: TaskStatuses, todoListId: string) => {
        dispatch(actionsForTasks.changeTaskStatus(id, status, todoListId))
    }, [dispatch]);
    const changeTaskTitle = useCallback ((id: string, title: string, todoListId: string) => {
        dispatch(actionsForTasks.changeTaskTitle(id, title, todoListId))
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


