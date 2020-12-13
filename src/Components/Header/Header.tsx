import React, {ReactElement} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {useDispatch, useSelector} from "react-redux";
import HeaderLang from "./HeaderLang";
import {translate} from "../../Utils/lang";
import {getLang} from "../../Store/selectors/app-selectors";
import brown from "@material-ui/core/colors/brown";
import AddIcon from '@material-ui/icons/Add';
import {Link as RouterLink} from 'react-router-dom';
import {Button} from "@material-ui/core";
import {editorAC} from "../../Store/reducers/editor-reducer";
import {workspaceAC} from "../../Store/reducers/workspace-reducer";
import {textAC} from "../../Store/reducers/text-reducer";

//================= CUSTOM HOOK =========================
const useHeader = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const logo = translate(lang, 'Banner creator');
    const createNewLabel = translate(lang, 'Create new');
    const dispatch = useDispatch();
    const onCreateNewHandler = () => {
        dispatch(editorAC.setSize({
            width: null,
            height: null
        }));
        dispatch(editorAC.setBackgroundStyle('color'));
        dispatch(editorAC.setBackgroundStyleColor({color: '#FFF'}));
        dispatch(editorAC.setUseBorder(false));
        dispatch(workspaceAC.setZoom(100));
        dispatch(textAC.removeTextAll());
        dispatch(editorAC.setMainSidebarItem(0));
        dispatch(editorAC.setSecondarySidebarBackgroundTabIndex(0));
        dispatch(editorAC.setImageTabIndex(0));
        dispatch(editorAC.setBorderColor('#000'));
    };
    return {
        classes, logo, createNewLabel, onCreateNewHandler
    }
};

//======================= COMPONENT ===============================
const Header: React.FC<{}> = (): ReactElement => {
    const {
        classes, logo, createNewLabel, onCreateNewHandler
    } = useHeader();

    return (
        <div className={classes.header}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" noWrap className={classes.logo}>
                    {logo}
                </Typography>
                <HeaderLang/>
                <Button color="inherit"
                        variant='contained'
                        startIcon={<AddIcon />}
                        className={classes.button}
                        onClick={onCreateNewHandler}
                        component={RouterLink}
                        to='/'>
                    {createNewLabel}
                </Button>
            </Toolbar>
        </div>
    );
};
export default Header;

//================================ STYLES =======================================
const useStyles = makeStyles({
    header: {
        backgroundColor: brown[900],
        height: 64,
        zIndex: 100
    },
    toolBar: {
        maxWidth: 1000,
        width: '100%',
        height: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0 10px',
    },
    logo: {
        flexGrow: 1,
        color: 'white'
    },
    button: {
        textTransform: 'none'
    },
});


