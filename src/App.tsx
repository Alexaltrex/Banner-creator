import React, {ReactElement, useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "./Store/selectors/app-selectors";
import {StringParam, useQueryParam} from "use-query-params";
import {appAC} from "./Store/reducers/app-reducer";
import {LangType} from "./Types/types";

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

    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const [langQuery, setLangQuery] = useQueryParam('lang', StringParam);
    // URL => STATE
    useEffect(() => {
        dispatch(appAC.setLang(langQuery ? langQuery as LangType : lang));
    }, [dispatch]);

    // STATE => URL
    useEffect(() => {
        setLangQuery(lang === 'eng' ? undefined : 'rus');
    }, [lang]);

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

