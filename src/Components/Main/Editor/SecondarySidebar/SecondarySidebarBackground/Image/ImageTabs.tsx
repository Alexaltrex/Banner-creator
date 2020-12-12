import {useDispatch, useSelector} from "react-redux";
import {
    getImageTabIndex,
} from "../../../../../../Store/selectors/editor-selectors";
import React from "react";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../Utils/lang";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Tabs, Theme} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

//====================== CUSTOM HOOK ====================
const useImageTabs = () => {
    const imageTabIndex = useSelector(getImageTabIndex);
    const dispatch = useDispatch();
    const onChangeHandler = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(editorAC.setImageTabIndex(newValue))
    };
    const lang = useSelector(getLang);
    const labels = [];
    labels[0] = translate(lang, 'My images');
    labels[1] = translate(lang, 'Settings');
    const classes = useStyles();
    return {
        imageTabIndex, onChangeHandler, classes,
        labels
    }
};

//======================= COMPONENT ====================
const ImageTabs: React.FC<{}> = () => {
    const {
        imageTabIndex, onChangeHandler, classes,
        labels
    } = useImageTabs();
    return (
        <Tabs
            value={imageTabIndex}
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
        </Tabs>
    )
};
export default ImageTabs;

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
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