import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createTask, removeTask, TasksStateType, updateTask} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';
import {actionsForTodoLists, createTodoList, fetchTodoLists, FilterValuesType,
    removeTodoLists, TodoListDomainType, updateTodoListTitle} from "./state/todoListsReducer";
import {TaskStatuses} from "./api/todoListsAPI";


export function App() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => {
       return  state.todoLists
    });
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);

    const deleteTodoList = useCallback ((todoListId: string) => {
        dispatch(removeTodoLists(todoListId))
    }, [dispatch]);
    const addTodoList = useCallback ((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback ((todoListId: string, title: string) => {
        dispatch(updateTodoListTitle(todoListId, title))
    }, [dispatch]);
    const changeFilter = useCallback ((todoListId:  string, value: FilterValuesType) => {
        dispatch(actionsForTodoLists.updateTodoListFilter(todoListId, value))
    }, [dispatch]);

    const deleteTask = useCallback ((id: string, todoListId: string) => {
        dispatch(removeTask(id, todoListId))
    }, [dispatch]);
    const addTask = useCallback ((title: string, todoListId: string) => {
        dispatch(createTask(todoListId, title))
    }, [dispatch]);
    const changeTaskStatus = useCallback ((todoListId: string, id: string, status: TaskStatuses) => {
        dispatch(updateTask(todoListId, id, {status}))
    }, [dispatch]);
    const changeTaskTitle = useCallback ((id: string, title: string, todoListId: string) => {
        dispatch(updateTask(todoListId, id, {title}))
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
                                            removeTask={deleteTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodoList={deleteTodoList}
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


