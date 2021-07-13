import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo ((props) => {

    const {
        value,
        disabled,
        onChangeTitle,
    } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [displayedTitle, setDisplayedTitle] = useState<string>(value);

    const activateEditMode = () => {
        setEditMode(true);
        setDisplayedTitle(value);
    };
    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(displayedTitle);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setDisplayedTitle(e.currentTarget.value);

    return editMode
        ? <TextField
            size={"small"}
            value={displayedTitle}
            autoFocus
            disabled={disabled}
            onBlur={activateViewMode}
            onChange={onChangeHandler}
        />
        : <span onDoubleClick={activateEditMode}>{displayedTitle}</span>
});


// types
export type EditableSpanPropsType = {
    value: string
    onChangeTitle: (newValue: string) => void
    disabled: boolean
};