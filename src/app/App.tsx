import React, {useEffect} from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/errorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {AppInitialStateType, initializeApp} from "./appReducer";
import {Login} from "../features/login/Login";
import {Switch, Route, Redirect} from "react-router-dom";
import {Error404} from "../features/404/Error404";
import {Dispatch} from "redux";
import {CircularProgress} from "@material-ui/core";
import {logout} from "../features/login/auth-reducer";


export const App: React.FC<AppPropsType> = (props) => {

    const appState = useSelector<AppRootStateType, AppInitialStateType>(state => state.app);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
    }, []);

    const {
        demo = false,
    } = props;

    const logoutHandler = () => {
        dispatch(logout())
    };


    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className="App">
            {
                appState.status === "loading"
                && <LinearProgress color={"secondary"}
                style={{position: "fixed", bottom: 0, height: "7px", right: 0, left: 0,}}/>
            }
            <AppBar position="static" color={"default"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    {
                        isLoggedIn
                        && <Button variant={"outlined"} color={"inherit"} onClick={logoutHandler}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'}
                           render={
                               () => <TodoListsList disabled={appState.addingTodoList} demo={demo}/>
                           }/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
};


// types
type AppPropsType = {
    demo?: boolean
};