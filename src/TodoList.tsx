import React, {useCallback} from "react";
import {FilterValuesType, TaskPropsType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {Task} from "./Task";

export type TodoListPropsType = {
    todoListId: string,
    title: string,
    tasks: TaskPropsType[],
    filter: FilterValuesType,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (todoListId:  string, value: FilterValuesType) => void,
    addTask: (value: string, todoListId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void,
    removeTodoList: (id: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    changeTodoListTitle: (todoListId: string, title: string) => void,
}

export const TodoList = React.memo ((props: TodoListPropsType) => {

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListId),
        [props.addTask, props.todoListId]);
    const removeTodoList = () => props.removeTodoList(props.todoListId);
    const changeTodoListTitle = useCallback(
        (newValue: string) => props.changeTodoListTitle(props.todoListId, newValue),
        [props.changeTodoListTitle, props.todoListId]);

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'all'),
        [props.changeFilter, props.todoListId]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'active'),
        [props.changeFilter, props.todoListId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'completed'),
        [props.changeFilter, props.todoListId]);


    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }


    const allTasks = tasksForTodoList.map( (t:TaskPropsType ) => <Task
        key={t.id}
        changeTaskStatus={props.changeTaskStatus}
        removeTask={props.removeTask}
        changeTaskTitle={props.changeTaskTitle}
        task={t}
        todoListId={props.todoListId} /> );

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
});


