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

export const TodoList = React.memo ((
    {
        addTask,
        todoListId,
        tasks,
        changeFilter,
        title,
        removeTask,
        removeTodoList,
        changeTodoListTitle,
        changeTaskStatus,
        changeTaskTitle,
        filter,
    }: TodoListPropsType) => {

    const addTaskFn = useCallback((title: string) => addTask(title, todoListId),
        [addTask, todoListId]);
    const removeTodoListFn = useCallback(
        () => removeTodoList(todoListId),
        [removeTodoList, todoListId]);
    const changeTodoListTitleFn = useCallback(
        (newValue: string) => changeTodoListTitle(todoListId, newValue),
        [changeTodoListTitle, todoListId]);

    const onAllClickHandler = useCallback(() => changeFilter(todoListId, 'all'),
        [changeFilter, todoListId]);
    const onActiveClickHandler = useCallback(() => changeFilter(todoListId, 'active'),
        [changeFilter, todoListId]);
    const onCompletedClickHandler = useCallback(() => changeFilter(todoListId, 'completed'),
        [changeFilter, todoListId]);


    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }


    const allTasks = tasksForTodoList.map( (t:TaskPropsType ) => <Task
        key={t.id}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}
        changeTaskTitle={changeTaskTitle}
        task={t}
        todoListId={todoListId} /> );

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChangeTitle={changeTodoListTitleFn} />
                <IconButton color={"secondary"} size={"medium"} onClick={removeTodoListFn}>
                    <DeleteForever />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskFn} />
            <div>
                {allTasks}
            </div>
            <div>
                <Button
                    color={filter === 'all' ? 'default' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color={filter === 'active' ? 'primary' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color={filter === 'completed' ? 'primary' : 'default'}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
});


