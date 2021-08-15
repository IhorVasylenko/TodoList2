import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {actionsForApp} from "../../app/appReducer";
import {Dispatch} from "redux";


function Alert(props: AlertProps) {
    return (
        <MuiAlert elevation={6} variant="filled" {...props} />
    );
}


export const ErrorSnackbar: React.FC = React.memo(() => {

    const error  = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const dispatch: Dispatch<any> = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        dispatch(actionsForApp.setAppError(null));
    }

    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
});

