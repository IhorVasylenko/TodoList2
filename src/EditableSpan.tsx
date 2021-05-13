import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string
    onChangeTitle: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)           //?
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField size={"small"} value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}