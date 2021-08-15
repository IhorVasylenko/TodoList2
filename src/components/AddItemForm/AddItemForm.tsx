import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo ((props) => {

    const {
        addItem,
        disabled,
    } = props;

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItemFn = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError("Title is required")
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if(e.charCode === 13) {
            addItemFn();
        }
    };

    return (
        <div>
            <TextField
                color={error ? "secondary" : "primary"}
                style={{padding: 0}}
                autoFocus
                label={error ? "Required to fill" : "Add task ..."}
                size={"small"}
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                disabled={disabled}
            />
            <IconButton size={"medium"} color={error ? "secondary" : "primary"} onClick={addItemFn} disabled={disabled}>
                <AddBox />
            </IconButton>
        </div>
    );
});


// types
export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
};