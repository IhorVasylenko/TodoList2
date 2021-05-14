import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todoListsReducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasksReducer";


export type TasksStateType = {
    [key: string]: TaskPropsType[]
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | "active" | 'completed'
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export function AppWithReducers() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id:v1(), title: 'HTML', isDone: false},
            {id:v1(), title: 'CSS', isDone: false},
            {id:v1(), title: 'React', isDone: false}
        ],
        [todoListId2]: [
            {id:v1(), title: 'Motorcycle', isDone: false},
            {id:v1(), title: 'New car', isDone: false}
        ]
    })

    const removeTodoList = (id: string) => {
        dispatchToTasks(RemoveTodoListAC(id))
        dispatchToTodoLists(RemoveTodoListAC(id))
    }
    const addTodoList = (title: string) => {
        dispatchToTasks(AddTodoListAC(title))
        dispatchToTodoLists(AddTodoListAC(title))
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(todoListId, title))
    }
    const changeFilter = (todoListId:  string, value: FilterValuesType) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListId, value))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(RemoveTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(AddTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(ChangeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(ChangeTaskTitleAC(taskId, title, todoListId))
    }

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
                            let allTodoListTasks = tasks[tl.id]
                            let tasksForTodoList = allTodoListTasks

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: "20px", borderRadius: "10px"}}>
                                        <TodoList
                                            key={tl.id}
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


