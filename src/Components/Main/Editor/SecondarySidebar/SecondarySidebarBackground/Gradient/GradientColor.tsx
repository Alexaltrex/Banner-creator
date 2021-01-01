import React from "react";
import {makeStyles} from "@material-ui/core";
import SelectColorButtonCustom from "../../../../../common/SelectColorButtonCustom";
import {useDispatch, useSelector} from "react-redux";
import {getColorEnd, getColorStart} from "../../../../../../Store/selectors/editor-selectors";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import styled from "styled-components";
import GradientColorInvert from "./GradientColorInvert";

//===================== CUSTOM HOOK ===================
const useGradientColor = () => {
    const classes = useStyles();
    const colorStart = useSelector(getColorStart);
    const colorEnd = useSelector(getColorEnd);
    const dispatch = useDispatch()
    const onSelectColorStartHandler = (color: string) => {
        dispatch(editorAC.setColorStart(color))
    };
    const onSelectColorEndHandler = (color: string) => {
        dispatch(editorAC.setColorEnd(color))
    };
    return {
        classes, colorStart, colorEnd,
        onSelectColorStartHandler, onSelectColorEndHandler
    }
};

//==================== STYLED ====================
const GradientDiv = styled.div`
    height: 25px;
    margin-top: 5px;
    background: ${
    (props: PropsType) => `linear-gradient(90deg, ${props.colorStart} 0%, ${props.colorEnd} 100%)`
};
`

//==================== COMPONENT ======================
const GradientColor: React.FC<{}> = () => {
    const {
        classes, colorStart, colorEnd,
        onSelectColorStartHandler, onSelectColorEndHandler,
    } = useGradientColor();

    return (
        <div className={classes.gradientColor}>
            <div className={classes.buttons}>
                <SelectColorButtonCustom
                    color={colorStart}
                    enable={true}
                    onPickColorHandler={onSelectColorStartHandler}
                    size={25}
                    tipTitle='Select start color'
                    header='Select start color'
                    anchorOriginVertical='top'
                    anchorOriginHorizontal='left'
                    transformOriginVertical='top'
                    transformOriginHorizontal='left'
                />
                <GradientColorInvert/>
                <SelectColorButtonCustom
                    color={colorEnd}
                    enable={true}
                    onPickColorHandler={onSelectColorEndHandler}
                    size={25}
                    tipTitle='Select end color'
                    header='Select end color'
                    anchorOriginVertical='top'
                    anchorOriginHorizontal='right'
                    transformOriginVertical='top'
                    transformOriginHorizontal='right'
                />
            </div>
            <GradientDiv colorStart={colorStart}
                         colorEnd={colorEnd}
            />
        </div>
    )
};
export default GradientColor;

//==================== TYPE ===================
type PropsType = {
    colorStart: string
    colorEnd: string
}

//==================== STYLES ===============
const useStyles = makeStyles({
    gradientColor: {
        padding: '0 10px',
        marginBottom: 10
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});