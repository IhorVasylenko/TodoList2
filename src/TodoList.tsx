import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskPropsType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteForever} from "@material-ui/icons";


export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskPropsType[]
    filter: FilterValuesType
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (todoListId:  string, value: FilterValuesType) => void
    addTask: (value: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const allTasks = props.tasks.map( t => {
        const onClickHandler = () => props.removeTask(t.id, props.todoListId)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue, props.todoListId)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListId)
            return (
                <div key={t.id} >
                    <Checkbox size={"small"} color={"default"}  id={t.id} checked={t.isDone} onChange={onChangeHandler}/>
                    <span style={t.isDone ? {opacity: "0.5"} : {opacity: "1"}} >
                        <EditableSpan value={t.title} onChangeTitle={changeTaskTitle}/>
                    </span>
                    <IconButton onClick={onClickHandler}>
                        <Delete />
                    </IconButton>
                </div>
            )
        }
    )

    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (newValue: string) => props.changeTodoListTitle(props.todoListId, newValue)

    const onAllClickHandler = () => props.changeFilter(props.todoListId, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, 'completed')


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChangeTitle={changeTodoListTitle} />
                <IconButton color={"secondary"} size={"medium"} onClick={removeTodoList}>
                    <DeleteForever />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {allTasks}
            </div>
            <div>
                <Button
                    color={props.filter === 'all' ? 'default' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color={props.filter === 'active' ? 'primary' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color={props.filter === 'completed' ? 'primary' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}


