import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useDispatch} from "react-redux";
import {textAC} from "../../../../../../Store/reducers/text-reducer";

//======================== CUSTOM HOOK ============================
const useButtonUpperCase = (selectedTextId: number, upperCase: boolean) => {
    const classes = useStyles();
    const variant = (upperCase ? 'outlined' : 'text') as 'outlined' | 'text';
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(textAC.setUpperCase(selectedTextId, upperCase ? false : true));
        if (!upperCase) {
            dispatch(textAC.setLowerCase(selectedTextId, false))
        }
    };

    return {
        classes, onClickHandler, variant
    }
};

//======================== COMPONENT ==============================
const ButtonUpperCase: React.FC<PropsType> = ({selectedTextId, upperCase}) => {
    const {
        classes, onClickHandler, variant
    } = useButtonUpperCase(selectedTextId, upperCase);

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
export default ButtonUpperCase

//======================== TYPE =========================
type PropsType = {
    selectedTextId: number
    upperCase: boolean
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
