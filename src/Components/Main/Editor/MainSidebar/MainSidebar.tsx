import React, {ReactElement} from "react";
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import TextFieldsSharpIcon from '@material-ui/icons/TextFieldsSharp';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../Store/selectors/app-selectors";
import Tabs from "@material-ui/core/Tabs";
import {getMainSidebarItem} from "../../../../Store/selectors/editor-selectors";
import {editorAC} from "../../../../Store/reducers/editor-reducer";
import {translate} from "../../../../Utils/lang";
import Tab from "@material-ui/core/Tab";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";

//============ CUSTOM HOOK ====================
const useMainSidebar = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const labels = [];
    labels[0] = translate(lang, 'Background');
    labels[1] = translate(lang, 'Text');
    const mainSidebarItem = useSelector(getMainSidebarItem);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(editorAC.setShowSecondSidebar(true))
    };
    const changeHandler = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(editorAC.setMainSidebarItem(newValue));
    };
    return {
        classes, mainSidebarItem, onClickHandler,
        changeHandler, labels
    }
};

//============== COMPONENT =================
const MainSidebar: React.FC<{}> = (): ReactElement => {
    const {
        classes, mainSidebarItem, onClickHandler,
        changeHandler, labels
    } = useMainSidebar();
    const icons = [
        <ViewComfyIcon/>,
        <TextFieldsSharpIcon/>
    ];

    return (
        <Tabs
            classes={{
                indicator: classes.indicator
            }}
            orientation="vertical"
            value={mainSidebarItem}
            onChange={changeHandler}
        >
            <Tab
                label={labels[0]}
                onClick={onClickHandler}
                icon={icons[0]}
                classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                    root: classes.tabRoot,
                    labelIcon: classes.labelIcon
                }}/>
            <Tab label={labels[1]}
                 onClick={onClickHandler}
                 icon={icons[1]}
                 classes={{
                     wrapper: classes.wrapper,
                     selected: classes.selected,
                     root: classes.tabRoot,
                     labelIcon: classes.labelIcon
                 }}/>
        </Tabs>
    )
};
export default MainSidebar;

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    cardContent: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingRight: 5,
        '&:last-child': {
            paddingBottom: 5
        }
    },
    indicator: {
        width: 3,
        left: 'auto',
        right: 0,
        backgroundColor: 'white'
    },
    wrapper: {
        fontSize: 12,
        textTransform: 'none',
        '& > *:first-child': {
            marginBottom: '0!important'
        }
    },
    selected: {
        color: grey[50],
        backgroundColor: brown[600]
    },
    tabRoot: {
        padding: 0,
        marginLeft: 0,
        color: 'white',
        maxWidth: '100%',
        minWidth: '100%',
    },
    labelIcon: {
        minHeight: 50,
    }
}));