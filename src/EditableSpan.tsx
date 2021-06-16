import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string,
    onChangeTitle: (newValue: string) => void,
};
export const EditableSpan = React.memo (({onChangeTitle, value}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    };
    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(title);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <TextField size={"small"} value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
});