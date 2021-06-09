import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskPropsType} from "./AppWithRedux";

export type TaskType = {
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void,
    removeTask: (id: string, todoListId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    task: TaskPropsType,
    todoListId: string,
};

export const Task = React.memo((props: TaskType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListId)
    };
    const changeTaskTitle = useCallback (
        (title: string) => props.changeTaskTitle(props.task.id, title, props.todoListId),
        [props.changeTaskTitle, props.task.id, props.todoListId]);

    return (
        <div key={props.task.id}>
            <Checkbox
                size={"small"}
                color={"default"}
                id={props.task.id}
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />
            <span style={props.task.isDone ? {opacity: "0.5"} : {opacity: "1"}}>
                        <EditableSpan value={props.task.title} onChangeTitle={changeTaskTitle}/>
                    </span>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});