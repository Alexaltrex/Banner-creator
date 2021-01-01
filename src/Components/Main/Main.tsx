import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PageNotFound from "../common/PageNotFound";
import CreateNew from "./CreateNew/CreateNew";
import {Route, Switch} from "react-router-dom";
import Editor from "./Editor/Editor";

//======================== CUSTOM HOOK =========================
const useMain = () => {
    const classes = useStyles();
    return {classes}
};

//======================= COMPONENT ===============================
const Main: React.FC<{}> = (): ReactElement => {
    const {classes} = useMain();
    return (
        <main className={classes.main}>
                <Switch>
                    <Route exact path='/' render={() => <CreateNew/>}/>
                    <Route path='/editor' render={() => <Editor/>}/>
                    <Route path='*' render={() => <PageNotFound/>}/>
                </Switch>
        </main>
    )
};
export default Main;

//========================== STYLES ================================================
const useStyles = makeStyles({
    main: {
        display: 'flex',
        boxSizing: 'border-box',
        height: 'calc(100vh - 64px)',
        width: '100vw'
    }
});