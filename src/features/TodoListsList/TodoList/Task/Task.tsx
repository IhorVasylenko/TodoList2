import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "../../../../api/todoListsAPI";
import {TaskDomainType} from "../../tasksReducer";


export const Task: React.FC<TasksType> = React.memo((props) => {

    const {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask,
        todoListId,
    } = props;

    const onClickHandler = useCallback(
        () => removeTask(task.id, todoListId),
        [removeTask, task.id, todoListId]);

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
                disabled={task.entityStatus === "loading"}
            />
            <span style={task.status === TaskStatuses.Completed ? {opacity: "0.5"} : {opacity: "1"}}>
                        <EditableSpan
                            value={task.title}
                            onChangeTitle={changeTaskTitleFn}
                            disabled={task.entityStatus === "loading"}
                        />
                    </span>
            <IconButton onClick={onClickHandler} disabled={task.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>
    );
});


// types
export type TasksType = {
    changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    task: TaskDomainType
    todoListId: string
};