import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import grey from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";
import clsx from "clsx";
import LeftPanelText from "./LeftPanelText/LeftPanelText";
import LeftPanelColor from "./LeftPanelColor";
import {useDispatch, useSelector} from "react-redux";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import {getSelectedTextId} from "../../../../../Store/selectors/text-selectors";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../Utils/lang";

//============ CUSTOM HOOK ====================
const useLeftPanel = () => {
    const [leftPanelIndex, setLeftPanelIndex] = useState(-1)
    const classes = useStyles();
    const selectedTextId = useSelector(getSelectedTextId) as number;
    const onClickHandler = [];
    onClickHandler[0] = () => {
        setLeftPanelIndex(0);
    };
    onClickHandler[1] = () => {
        setLeftPanelIndex(1);
    };
    onClickHandler[2] = () => {
        setLeftPanelIndex(2);
        dispatch(textAC.removeText(selectedTextId))
    };
    const refLeftPanel = useRef(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(workspaceAC.setRefLeftPanel(refLeftPanel))
    });
    const lang = useSelector(getLang);
    const textLabel = translate(lang, 'Text');
    const colorLabel = translate(lang, 'Color');
    const deleteLabel = translate(lang, 'Delete');
    return {
        classes, leftPanelIndex, onClickHandler,
        refLeftPanel, textLabel, colorLabel,
        deleteLabel
    }
}

//============== COMPONENT =================
const LeftPanel: React.FC<{}> = () => {
    const {
        classes, leftPanelIndex, onClickHandler,
        refLeftPanel, textLabel, colorLabel,
        deleteLabel
    } = useLeftPanel();

    return (
        <div className={classes.leftPanel} ref={refLeftPanel}>

            <List className={classes.list}>

                <Tooltip title={textLabel} placement="right" arrow
                         classes={{
                             tooltip: classes.tooltip,
                             arrow: classes.arrow
                         }}>
                    <ListItem button
                              className={classes.listItem}
                              onClick={onClickHandler[0]}
                              selected={leftPanelIndex === 0}>
                        <ListItemIcon>
                            <TextFieldsIcon
                                className={clsx(classes.icon, leftPanelIndex === 0 && classes.iconSelected)}/>
                        </ListItemIcon>
                    </ListItem>
                </Tooltip>

                <Tooltip title={colorLabel} placement="right" arrow
                         classes={{
                             tooltip: classes.tooltip,
                             arrow: classes.arrow
                         }}>
                    <ListItem button
                              className={classes.listItem}
                              onClick={onClickHandler[1]}
                              selected={leftPanelIndex === 1}>
                        <ListItemIcon>
                            <ColorLensIcon
                                className={clsx(classes.icon, leftPanelIndex === 1 && classes.iconSelected)}/>
                        </ListItemIcon>
                    </ListItem>
                </Tooltip>

                <Tooltip title={deleteLabel} placement="right" arrow
                         classes={{
                             tooltip: classes.tooltip,
                             arrow: classes.arrow
                         }} >
                    <ListItem button
                              className={classes.listItem}
                              onClick={onClickHandler[2]}
                              selected={leftPanelIndex === 2}>
                        <ListItemIcon>
                            <DeleteForeverIcon
                                className={clsx(classes.icon, leftPanelIndex === 2 && classes.iconSelected)}/>
                        </ListItemIcon>
                    </ListItem>
                </Tooltip>

            </List>

            <div>
                {
                    leftPanelIndex === 0 && <LeftPanelText/>
                }
                {
                    leftPanelIndex === 1 && <LeftPanelColor/>
                }
            </div>
        </div>

    )
};
export default LeftPanel;

//================================ STYLES =======================================
const useStyles = makeStyles({
    leftPanel: {
        padding: 0,
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        alignItems: 'flex-start'
    },
    list: {
        width: 60,
        border: '1px solid #ccc',
        backgroundColor: '#FFF',
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 5,
        padding: 0
    },
    listItem: {
        '&:hover': {
            backgroundColor: grey[400]
        },
        '&.Mui-selected:hover': {
            backgroundColor: indigo[500],
        },
        '&.Mui-selected': {
            backgroundColor: indigo[500],
        },
    },
    icon: {
        color: grey[800]
    },
    iconSelected: {
        color: '#FFF'
    },
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    }
});

