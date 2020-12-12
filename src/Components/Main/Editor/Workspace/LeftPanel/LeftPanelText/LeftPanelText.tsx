import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import grey from "@material-ui/core/colors/grey";
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {useDispatch, useSelector} from "react-redux";
import {translate} from "../../../../../../Utils/lang";
import {getSelectedTextId, getTexts} from "../../../../../../Store/selectors/text-selectors";
import {TextType} from "../../../../../../Types/types";
import {textAC} from "../../../../../../Store/reducers/text-reducer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonFontStyle from "./ButtonFontStyle";
import ButtonLowerCase from "./ButtonLowerCase";
import ButtonUpperCase from "./ButtonUpperCase";

//============ CUSTOM HOOK ====================
const useLeftPanelText = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const textLabel = translate(lang, 'Text');
    const fontSizeLabel = translate(lang, 'Font size (px)');
    const texts = useSelector(getTexts);
    const selectedTextId = useSelector(getSelectedTextId);
    const value = (texts.find(el => el.id === selectedTextId) as TextType).fontSize;
    const fontStyle = (texts.find(el => el.id === selectedTextId) as TextType).fontStyle;
    const lowerCase = (texts.find(el => el.id === selectedTextId) as TextType).lowerCase;
    const upperCase = (texts.find(el => el.id === selectedTextId) as TextType).upperCase;
    const dispatch = useDispatch();
    const handleChange = (e: any, value: number | number[]) => {
        dispatch(textAC.setFontSize(selectedTextId as number, value as number));
    };
    const values = [] as Array<number>;
    for (let i = 6; i <= 300; i = i + 2) {
        values.push(i);
    }
    const optionElements = values.map(
        el => <option key={el} value={el}>{el}</option>
    );
    const onChangeSelectHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(textAC.setFontSize(selectedTextId as number, event.target.value as number));
    };
    return {
        classes, textLabel, fontSizeLabel, value,
        handleChange, optionElements, fontStyle,
        onChangeSelectHandle, selectedTextId,
        lowerCase, upperCase
    }
};


//============== COMPONENT =================
const LeftPanelText: React.FC<{}> = () => {
    const {
        classes, textLabel, fontSizeLabel,
        value, handleChange, optionElements,
        onChangeSelectHandle, selectedTextId,
        fontStyle, lowerCase, upperCase
    } = useLeftPanelText();
    return (
        <div className={classes.LeftPanelText}>
            <Typography variant='subtitle2'
                        className={classes.typography}
            >
                {textLabel}
            </Typography>

            <div className={classes.form}>
                <Typography variant='body2'>
                    {fontSizeLabel}
                </Typography>
                <Slider className={classes.slider}
                        min={6}
                        max={300}
                        step={2}
                        value={value}
                        onChange={handleChange}
                />

                <div className={classes.formControlWrapper}>
                    <FormControl variant="outlined" className={classes.formControl} size='small'>
                        <Select
                            native
                            value={value}
                            onChange={onChangeSelectHandle}
                        >
                            {optionElements}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.fontStyleBlock}>
                    <ButtonFontStyle selectedTextId={selectedTextId as number}
                                     fontStyle={fontStyle}
                    />
                    <ButtonLowerCase selectedTextId={selectedTextId as number}
                                     lowerCase={lowerCase}/>
                    <ButtonUpperCase selectedTextId={selectedTextId as number}
                                     upperCase={upperCase}/>
                </div>
            </div>
        </div>
    )
};
export default LeftPanelText;

//================================ STYLES =======================================
const useStyles = makeStyles({
    LeftPanelText: {
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
        padding: '10px 20px'
    },
    slider: {
        margin: '10px 0',
    },
    formControlWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    formControl: {
        margin: 5,
        minWidth: 60,
    },
    fontStyleBlock: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
});