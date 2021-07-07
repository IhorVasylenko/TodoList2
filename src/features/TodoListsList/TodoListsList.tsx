import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    actionsForTodoLists,
    createTodoList,
    fetchTodoLists,
    FilterValuesType,
    removeTodoLists,
    TodoListDomainType,
    updateTodoListTitle
} from "./todoListsReducer";
import {createTask, removeTask, TasksStateType, updateTask} from "./tasksReducer";
import {TaskStatuses} from "../../api/todoListsAPI";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList/TodoList";


export const TodoListsList: React.FC<TodoListsListPropsType> = (props) => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);

    const deleteTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoLists(todoListId))
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodoListTitle(todoListId, title))
    }, [dispatch]);
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(actionsForTodoLists.updateTodoListFilter(todoListId, value))
    }, [dispatch]);

    const deleteTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTask(id, todoListId))
    }, [dispatch]);
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(createTask(todoListId, title))
    }, [dispatch]);
    const changeTaskStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
        dispatch(updateTask(todoListId, id, {status}))
    }, [dispatch]);
    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(updateTask(todoListId, id, {title}))
    }, [dispatch]);

    return (
        <>
            <Grid container style={{padding: "20px 10px"}}>
                <AddItemForm addItem={addTodoList}/>
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
        </>
    )
}


// types
type TodoListsListPropsType = {}