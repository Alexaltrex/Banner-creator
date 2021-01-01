import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {HexColorPicker} from "react-colorful";
import './../../css/styles.css'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

//===================== CUSTOM HOOK ===================
const useSelectColorPopover = (
    onPickColor: (color: string) => void,
    handleClose: () => void,
    propsColor: string
) => {
    const [color, setColor] = useState(propsColor);
    const onAcceptHandler = () => {
        onPickColor(color);
        handleClose();
    };
    const classes = useStyles();
    return {
        color, setColor,
        onAcceptHandler, classes
    }
};

//==================== STYLED =========================
const Div = styled.div`
        width:  ${(props: {width: number}) => `${props.width}px`};
        padding: 15px;
`;

//==================== COMPONENT ======================
const SelectColorPopover: React.FC<PropsType> = (props) => {
    const {header, onPickColor, handleClose, propsColor, width = 230} = props;
    const {
        color, setColor,
        onAcceptHandler, classes
    } = useSelectColorPopover(onPickColor, handleClose, propsColor);
    return (
        <Div width={width}>
            <Typography variant='subtitle2' className={classes.title}>
                {header}
            </Typography>

            <HexColorPicker color={color} onChange={setColor}/>
            <Button variant='contained'
                    color='primary'
                    fullWidth
                    className={classes.button}
                    onClick={onAcceptHandler}
            >
                Select
            </Button>

        </Div>
    )
};
export default SelectColorPopover;

//=========================== TYPE =======================
type PropsType = {
    header: string
    onPickColor: (color: string) => void
    handleClose: () => void
    propsColor: string
    width?: number
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        marginTop: 10,
        textTransform: 'none'
    },
    title: {
        marginBottom: 10
    }
});