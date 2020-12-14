import IconButton from "@material-ui/core/IconButton";
import CachedIcon from '@material-ui/icons/Cached';
import {Tooltip} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../Utils/lang";

//==================== CUSTOM HOOK ==========================
const useGradientColorInvert = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const tipLabel = translate(lang, 'Invert colors');
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(editorAC.replaceColor())
    };
    return {
        classes, onClickHandler, tipLabel
    }
}

//===================== COMPONENT ===========================
const GradientColorInvert: React.FC<{}> = () => {
    const {
        classes, onClickHandler, tipLabel
    } = useGradientColorInvert();
    return (
        <Tooltip title={tipLabel} placement="right" arrow
                 classes={{
                     tooltip: classes.tooltip,
                     arrow: classes.arrow
                 }}>
            <IconButton size='small' onClick={onClickHandler}>
                <CachedIcon className={classes.icon}/>
            </IconButton>
        </Tooltip>
    )
};
export default GradientColorInvert;

//==================== STYLES ===============
const useStyles = makeStyles({
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    },
    icon: {
        color: 'white'
    },
});