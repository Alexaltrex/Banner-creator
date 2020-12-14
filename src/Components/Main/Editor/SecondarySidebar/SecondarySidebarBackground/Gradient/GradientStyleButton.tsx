import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {GradientStyleType} from "../../../../../../Types/types";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import {getBackgroundStyle, getGradientStyle} from "../../../../../../Store/selectors/editor-selectors";
import {Tooltip} from "@material-ui/core";
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../Utils/lang";

//============ CUSTOM HOOK ====================
const useGradientStyleButton = (gradientStyle: GradientStyleType, tip: string) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const gradientStyleFromState = useSelector(getGradientStyle);
    const backgroundStyle = useSelector(getBackgroundStyle);
    const lang = useSelector(getLang);
    const tipLabel = translate(lang, tip)

    const onClickHandler = () => {
        dispatch(editorAC.setBackgroundStyle('gradient'));
        dispatch(editorAC.setGradientStyle(gradientStyle));
    };
    return {
        classes, onClickHandler, gradientStyleFromState,
        backgroundStyle, tipLabel
    }
};

//============== COMPONENT =================
const GradientStyleButton: React.FC<PropsType> = (props) => {
    const {
        gradientStyle, tip
    } = props;
    const {
        classes, onClickHandler, gradientStyleFromState,
        backgroundStyle, tipLabel
    } = useGradientStyleButton(gradientStyle, tip);

    return (
        <Tooltip title={tipLabel} placement="right" arrow
                 classes={{
                     tooltip: classes.tooltip,
                     arrow: classes.arrow
                 }}>
        <div onClick={onClickHandler}
             className={clsx(
                 classes.gradientStyleButton,
                 gradientStyle === 'horizontal' && classes.horizontal,
                 gradientStyle === 'vertical' && classes.vertical,
                 gradientStyle === 'radial' && classes.radial,
                 backgroundStyle === 'gradient' && gradientStyleFromState === gradientStyle && classes.selected
             )}/>
        </Tooltip>
    )
};
export default GradientStyleButton;

//================= TYPE =============
type PropsType = {
    gradientStyle: GradientStyleType
    tip: string
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    gradientStyleButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        border: '2px solid black',
        boxSizing: 'border-box',
    },
    horizontal: {
        background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)'
    },
    vertical: {
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)'
    },
    radial: {
        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)'
    },
    selected: {
        outline: '2px solid #FFF'
    },
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    }
});

