import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskPropsType} from "./App";

export type TaskType = {
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void,
    removeTask: (id: string, todoListId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    task: TaskPropsType,
    todoListId: string,
};

export const Task: React.FC<TaskType> = React.memo((props) => {

    const {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask,
        todoListId,
    } = props;

    const onClickHandler = () => removeTask(task.tasksId, todoListId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.tasksId, newIsDoneValue, todoListId);
    };
    const changeTaskTitleFn = useCallback (
        (title: string) => changeTaskTitle(task.tasksId, title, todoListId),
        [changeTaskTitle, task.tasksId, todoListId]);

    return (
        <div key={task.tasksId}>
            <Checkbox
                size={"small"}
                color={"default"}
                id={task.tasksId}
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