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

export const Task = React.memo((
    {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask,
        todoListId,
    }: TaskType) => {
    const onClickHandler = () => removeTask(task.id, todoListId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todoListId);
    };
    const changeTaskTitleFn = useCallback (
        (title: string) => changeTaskTitle(task.id, title, todoListId),
        [changeTaskTitle, task.id, todoListId]);

    return (
        <div key={task.id}>
            <Checkbox
                size={"small"}
                color={"default"}
                id={task.id}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <span style={task.isDone ? {opacity: "0.5"} : {opacity: "1"}}>
                        <EditableSpan value={task.title} onChangeTitle={changeTaskTitleFn}/>
                    </span>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});