import React, {ReactElement, useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

//======================== CUSTOM HOOK =========================
const useApp = () => {
    const classes = useStyles();
    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(e);
    };
    useEffect(() => {
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
        }
    }, []);


    return {
        classes
    }
};


const App: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useApp();
    return (
        <div className={classes.app}>
            <Header/>
            <Main/>
        </div>
    );
};
export default App;

//============================= STYLE ==========================
const useStyles = makeStyles({
    app: {
        height: '100vh',
        width: '100vw'
    },
});

