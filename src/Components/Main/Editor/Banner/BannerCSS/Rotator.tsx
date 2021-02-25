import React, {useRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import {getRotatedTextId, getSelectedText} from "../../../../../Store/selectors/text-selectors";
import {verticalDisplacementOfRotator} from "../../../../../Utils/CONST";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";

//============ CUSTOM HOOK ====================
const useRotator = (id: number) => {

    const dispatch = useDispatch();
    const selectedText = useSelector(getSelectedText);
    const angle = selectedText.angle;
    const z = (useSelector(getZoom)) / 100;
    const refIcon = useRef(null);

    const rotatedTextId = useSelector(getRotatedTextId);
    //const sizeOfSelectedText = useSelector(getSizeOfSelectedText);
    const sizeOfText = selectedText.size;
    let dist = rotatedTextId ? verticalDisplacementOfRotator + 20 : verticalDisplacementOfRotator
    let top = -z * dist;
    let transformOriginTop = z * (dist + sizeOfText.height / 2);

    const props = {
        transformOriginTop,
        angle,
        top
    };
    const classes = useStyles(props);

    const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        dispatch(textAC.setRotatedTextId(id));// установить id вращаемого текста

        dispatch(textAC.setCursorOnRotatorPosition( // установить положение точки клика относительно окна
            e.clientX,
            e.clientY
        ));
    };

    return {
        classes, onMouseDownHandler, refIcon, rotatedTextId,
        angle
    }
};

//============== COMPONENT =================
const Rotator: React.FC<PropsType> = ({id}) => {
    const {
        classes, onMouseDownHandler, refIcon, rotatedTextId,
        angle
    } = useRotator(id);

    return (
        <div className={classes.rotator}
             onMouseDown={onMouseDownHandler}
        >
            {
                rotatedTextId
                    ? <span className={classes.angle}>
                    {`${Math.floor(angle > 0 ? angle : 360 + angle)}°`}
                    </span>
                    : <span className={classes.icon}>
                        ↻
                    </span>
            }
        </div>
    )
};
export default Rotator;

//======================= TYPE =========================
type PropsType = {
    id: number
}
type UseStylesPropsType = {
    transformOriginTop: number
    angle: number
    top: number
}

//============ ========= STYLES ========================
const useStyles = makeStyles({
    rotator: (props: UseStylesPropsType) => ({
        width: '0px',
        height: '0px',
        position: 'absolute',
        left: '50%',
        top: props.top,
        color: 'black',
        transformOrigin: `0px ${props.transformOriginTop}px`,
        transform: `translate(-50%, -50%) rotate(${props.angle}deg)`,
        //backgroundColor: 'red',
        //borderRadius: '50%',
        cursor: 'move'
    }),
    angle: (props: UseStylesPropsType) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(-50%, -50%) rotate(${-props.angle}deg)`,
        backgroundColor: 'white',
        fontSize: '16px',
        userSelect: 'none'
    }),
    icon: {
        display: 'inline-box',
        width: '20px',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: '20px',
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        userSelect: 'none'
    }
});