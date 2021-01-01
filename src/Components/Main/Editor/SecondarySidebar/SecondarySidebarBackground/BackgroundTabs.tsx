import {Tabs, Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getSecondarySidebarBackgroundTabIndex} from "../../../../../Store/selectors/editor-selectors";
import React from "react";
import {editorAC} from "../../../../../Store/reducers/editor-reducer";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../Utils/lang";

//====================== CUSTOM HOOK ====================
const useSecondarySidebarBackgroundTabs = () => {
    const secondarySidebarBackgroundTabIndex = useSelector(getSecondarySidebarBackgroundTabIndex)
    const dispatch = useDispatch();
    const onChangeHandler = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(editorAC.setSecondarySidebarBackgroundTabIndex(newValue))
    };
    const lang = useSelector(getLang);
    const labels = [];
    labels[0] = translate(lang, 'Color');
    labels[1] = translate(lang, 'Gradient');
    labels[2] = translate(lang, 'Image');
    const classes = useStyles();
    return {
        secondarySidebarBackgroundTabIndex,
        onChangeHandler, classes, labels
    }
}

//======================= COMPONENT ====================
const BackgroundTabs: React.FC<{}> = () => {
    const {
        secondarySidebarBackgroundTabIndex,
        onChangeHandler, classes, labels
    } = useSecondarySidebarBackgroundTabs()
    return (
        <Tabs
            value={secondarySidebarBackgroundTabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={onChangeHandler}
            classes={{
                indicator: classes.indicator
            }}
            className={classes.tabs}
        >
            <Tab label={labels[0]}
                 classes={{
                     wrapper: classes.wrapper,
                     selected: classes.selected,
                     root: classes.tabRoot,
                 }}
            />
            <Tab label={labels[1]}
                 classes={{
                     wrapper: classes.wrapper,
                     selected: classes.selected,
                     root: classes.tabRoot,
                 }}
            />
            <Tab label={labels[2]}
                 classes={{
                     wrapper: classes.wrapper,
                     selected: classes.selected,
                     root: classes.tabRoot,
                 }}
            />
        </Tabs>
    )
};
export default BackgroundTabs;

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        margin: '0 10px',
        minHeight: 0,
        borderBottom: `1px solid #aaa`,
        '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between'
        }
    },
    indicator: {
        height: 3,
        backgroundColor: 'white'
    },
    wrapper: {
        fontSize: 12,
        color: 'white',
        textTransform: 'none',
        '& > *:first-child': {
            marginBottom: '0!important'
        }
    },
    selected: {
        color: 'white'
    },
    tabRoot: {
        flexGrow: 1,
        marginLeft: 0,
        color: 'white',
        maxWidth: 'auto',
        minWidth: 'auto',
        padding: 5,
        minHeight: 0
    },
}));