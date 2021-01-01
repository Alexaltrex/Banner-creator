import React from "react";
import {makeStyles} from "@material-ui/core";
import {HexColorPicker} from "react-colorful";
import './../../../../../css/styles.css';
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedTextId, getTexts} from "../../../../../Store/selectors/text-selectors";
import {TextType} from "../../../../../Types/types";
import {translate} from "../../../../../Utils/lang";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import grey from "@material-ui/core/colors/grey";
import {textAC} from "../../../../../Store/reducers/text-reducer";

//===================== CUSTOM HOOK ===================
const useLeftPanelColor = () => {
    const lang = useSelector(getLang);
    const titleLabel = translate(lang, 'Color')
    const texts = useSelector(getTexts);
    const selectedTextId = useSelector(getSelectedTextId);
    const color = (texts.find(el => el.id === selectedTextId) as TextType).color;
    const dispatch = useDispatch();
    const onChangeHandler = (newColor: string) => {
        dispatch(textAC.setColor(selectedTextId as number, newColor));
    };
    const classes = useStyles();
    return {
        color, classes, titleLabel, onChangeHandler
    }
};

//==================== COMPONENT ======================
const LeftPanelColor: React.FC<{}> = () => {
    const {
        color, classes, titleLabel, onChangeHandler,
    } = useLeftPanelColor();

    return (
        <div className={classes.leftPanelColor}>
            <Typography variant='subtitle2'
                        className={classes.typography}>
                {titleLabel}
            </Typography>
            <div className={classes.form}>
                <HexColorPicker color={color}
                                onChange={onChangeHandler}
                                className={classes.colorPicker}
                />
            </div>

        </div>
    )
};
export default LeftPanelColor;

//================================ STYLES =======================================
const useStyles = makeStyles({
    leftPanelColor: {
        width: 200,
        border: '1px solid #ccc',
        backgroundColor: '#FFF',
        borderRadius: 5,
        overflow: 'hidden'
    },
    typography: {
        backgroundColor: grey[300],
        padding: '10px 20px'
    },
    form: {
        padding: '20px 20px'
    },
    colorPicker: {
        width: 160,
        height: 160
    }
});