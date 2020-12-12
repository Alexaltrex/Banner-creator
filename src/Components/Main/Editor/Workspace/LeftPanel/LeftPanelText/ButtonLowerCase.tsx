import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useDispatch} from "react-redux";
import {textAC} from "../../../../../../Store/reducers/text-reducer";

//======================== CUSTOM HOOK ============================
const useButtonFontStyle = (selectedTextId: number, lowerCase: boolean) => {
    const classes = useStyles();
    const variant = (lowerCase ? 'outlined' : 'text') as 'outlined' | 'text';
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(textAC.setLowerCase(selectedTextId, lowerCase ? false : true));
        if (!lowerCase) {
            dispatch(textAC.setUpperCase(selectedTextId, false))
        }
    };

    return {
        classes, onClickHandler, variant
    }
};

//======================== COMPONENT ==============================
const ButtonLowerCase: React.FC<PropsType> = ({selectedTextId, lowerCase}) => {
    const {
        classes, onClickHandler, variant
    } = useButtonFontStyle(selectedTextId, lowerCase);

    return (
        <Button size='small'
                variant={variant}
                className={classes.button}
                onClick={onClickHandler}
        >
            <Typography variant='h6'
                        className={classes.typography}

            >
                t
            </Typography>
        </Button>

    )
};
export default ButtonLowerCase

//======================== TYPE =========================
type PropsType = {
    selectedTextId: number
    lowerCase: boolean
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        minWidth: 42
    },
    typography: {
        textTransform: 'none'
    }
});
