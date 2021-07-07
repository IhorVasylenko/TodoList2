import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todoListsAPI";

export type TasksType = {
    changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void,
    removeTask: (id: string, todoListId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    task: TaskType,
    todoListId: string,
};

export const Task: React.FC<TasksType> = React.memo((props) => {

    const {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask,
        todoListId,
    } = props;

    const onClickHandler = () => removeTask(task.id, todoListId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(todoListId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
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
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <span style={task.status === TaskStatuses.Completed ? {opacity: "0.5"} : {opacity: "1"}}>
                        <EditableSpan value={task.title} onChangeTitle={changeTaskTitleFn}/>
                    </span>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});