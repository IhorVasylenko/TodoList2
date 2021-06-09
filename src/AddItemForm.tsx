import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if(e.charCode === 13) {
            addItem()
        }
    };

    return (
        <div>
            <TextField
                color={error ? 'secondary' : 'primary'}
                style={{padding: 0}}
                autoFocus
                label={error ? "Required to fill" : "Add task ..."}
                size={"small"}
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton size={"medium"} color={error ? 'secondary' : 'primary'} onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>
    );
})