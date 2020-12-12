import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {getAlign} from "../../../../../../../Store/selectors/editor-selectors";
import {AlignType} from "../../../../../../../Types/types";
import clsx from "clsx";
import {editorAC} from "../../../../../../../Store/reducers/editor-reducer";

//============ CUSTOM HOOK ====================
const useAlignButton = (ownAlign: AlignType) => {
    const classes = useStyles();
    const align = useSelector(getAlign);
    const dispatch = useDispatch();
    const onClickHandle = () => {
        dispatch(editorAC.setAlign(ownAlign))
    };
    return {
        classes, align, onClickHandle
    }
};

//================= COMPONENT ========================
const SettingsAlignButton: React.FC<PropsType> = ({ownAlign}) => {
    const {
        classes, align, onClickHandle
    } = useAlignButton(ownAlign);

    return (
        <div className={clsx(classes.alignButton, align === ownAlign && classes.selected)}
             onClick={onClickHandle}
        />
    )
};
export default SettingsAlignButton

//====================== TYPE =====================
type PropsType = {
    ownAlign: AlignType
}

//===================== STYLES ====================
const useStyles = makeStyles({
    alignButton: {
        width: 12,
        height: 12,
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: 'white',
        border: '2px solid #FFF'
    }
});