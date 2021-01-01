import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useDispatch} from "react-redux";
import {textAC} from "../../../../../../Store/reducers/text-reducer";

//======================== CUSTOM HOOK ============================
const useButtonFontStyle = (selectedTextId: number, fontStyle: 'normal' | 'italic') => {
    const classes = useStyles();
    const variant = (fontStyle === 'italic' ? 'outlined' : 'text') as 'outlined' | 'text';
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(textAC.setFontStyle(selectedTextId, fontStyle === 'italic' ? 'normal' : 'italic'))
    };

    return {
        classes, onClickHandler, variant
    }
}


//======================== COMPONENT ==============================
const ButtonFontStyle: React.FC<PropsType> = ({selectedTextId, fontStyle}) => {
    const {
        classes, onClickHandler, variant
    } = useButtonFontStyle(selectedTextId, fontStyle);

    return (
        <Button size='small'
                variant={variant}
                className={classes.button}
                onClick={onClickHandler}
        >
            <Typography variant='h6'
                        className={classes.typography}
            >
                T
            </Typography>
        </Button>

    )
};
export default ButtonFontStyle

//======================== TYPE =========================
type PropsType = {
    selectedTextId: number
    fontStyle: 'normal' | 'italic'
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        minWidth: 42
    },
    typography: {
        fontStyle: 'italic'
    }
});
