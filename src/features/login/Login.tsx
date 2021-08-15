import React from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "./auth-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

export const Login: React.FC = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch: Dispatch<any> = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 5) {
                errors.password = 'Invalid password, minimum length 5 characters';
            } else if (values.password.length > 20) {
                errors.password = 'Invalid password, maximum length 20 characters';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values));
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Redirect to={'/'} />
    }


    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>here</a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                type="email"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email
                            && <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                label="Password"
                                margin="normal"
                                type="password"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password
                            && <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <FormControlLabel label={"Remember me"} control={
                                <Checkbox
                                    {...formik.getFieldProps("rememberMe")}
                                    value={formik.values.rememberMe}
                                />
                            }/>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
});


// types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
};

