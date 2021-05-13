import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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


function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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


    const removeTask = (id: string, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(tl => tl.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(tl => tl.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValuesType, todoListId:  string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
        setTasks({...tasks})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map( tl => tl.id === todoListId ? {...tl, title} : tl) )
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

export default App;


