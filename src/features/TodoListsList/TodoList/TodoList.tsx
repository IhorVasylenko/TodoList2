import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todoListsAPI";
import {FilterValuesType, TodoListDomainType} from "../todoListsReducer";
import {useDispatch} from "react-redux";
import {fetchTask, TaskDomainType} from "../tasksReducer";
import {Dispatch} from "redux";


export const TodoList: React.FC<TodoListPropsType> = React.memo ((props) => {

    const {
        todoList,
        addTask,
        tasks,
        changeFilter,
        removeTask,
        removeTodoList,
        changeTodoListTitle,
        changeTaskStatus,
        changeTaskTitle,
        demo = false,
    } = props;

    const {
        id,
        title,
        filter,
        entityStatus,
    } = todoList;

    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTask(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addTaskFn = useCallback((title: string) => addTask(title, id),
        [addTask, id]);
    const removeTodoListFn = useCallback(
        () => removeTodoList(id),
        [removeTodoList, id]);
    const changeTodoListTitleFn = useCallback(
        (newValue: string) => changeTodoListTitle(id, newValue),
        [changeTodoListTitle, id]);

    const onAllClickHandler = useCallback(() => changeFilter(id, 'all'),
        [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter(id, 'active'),
        [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter(id, 'completed'),
        [changeFilter, id]);


    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }



    const allTasks = tasksForTodoList.map( (t: TaskDomainType ) => {
       return <Task
            key={t.id}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}
            task={t}
            todoListId={t.todoListId}/>
    } );

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChangeTitle={changeTodoListTitleFn} disabled={entityStatus === "loading"}/>
                <IconButton
                    color={"secondary"}
                    size={"medium"}
                    onClick={removeTodoListFn}
                    disabled={entityStatus === "loading"}>
                    <DeleteForever />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskFn} disabled={entityStatus === "loading"} />
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


// types
export type TodoListPropsType = {
    todoList: TodoListDomainType
    tasks: TaskDomainType[]
    addTask: (value: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (todoListId:  string, value: FilterValuesType) => void
    changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    demo?: boolean
}


