import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../Utils/lang";
import {CheckboxProps, FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import SelectColorButtonCustom from "../../../../common/SelectColorButtonCustom";
import {getBorderColor, getUseBorder} from "../../../../../Store/selectors/editor-selectors";
import {editorAC} from "../../../../../Store/reducers/editor-reducer";
import withStyles from "@material-ui/core/styles/withStyles";

const WhiteCheckbox = withStyles({
    root: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
    }
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

//===================== CUSTOM HOOK ===================
const useBackgroundBorder = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const useBorder = useSelector(getUseBorder);
    const borderColor = useSelector(getBorderColor);
    const borderLabel = translate(lang, 'Border');
    const useBorderLabel = translate(lang, 'Use border');
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        if (useBorder) {
            dispatch(editorAC.setCanvasUrl('border', null))
        }
        dispatch(editorAC.setUseBorder(!useBorder))
    };
    const onSelectHandler = (color: string) => {
        dispatch(editorAC.setBorderColor(color))
    };
    return {
        classes, borderLabel, useBorderLabel,
        useBorder, onChangeHandler, onSelectHandler,
        borderColor
    }
};

//==================== COMPONENT ======================
const BackgroundBorder: React.FC<{}> = () => {
    const {
        classes, borderLabel, useBorderLabel,
        useBorder, onChangeHandler, onSelectHandler,
        borderColor
    } = useBackgroundBorder();

    return (
        <div className={classes.border}>
            <Typography variant='h6'
                        className={classes.typography}
            >
                {borderLabel}
            </Typography>
            <div className={classes.selectColorBlock}>
                <FormControlLabel
                    control={
                        <WhiteCheckbox
                            checked={useBorder}
                            onChange={onChangeHandler}
                        />
                    }
                    label={useBorderLabel}
                    className={classes.formControlLabel}
                />
                <SelectColorButtonCustom
                    color={borderColor}
                    enable={useBorder}
                    onPickColorHandler={onSelectHandler}
                    size={25}
                    tipTitle='Select color'
                    header='Select border color'
                    anchorOriginVertical='bottom'
                    anchorOriginHorizontal='right'
                    transformOriginVertical='bottom'
                    transformOriginHorizontal='right'
                />
            </div>
        </div>
    )
};
export default BackgroundBorder;

//============ STYLES =================
const useStyles = makeStyles({
    border: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 10px',
        borderTop: '1px solid #ccc'
    },
    typography: {
        color: 'white'
    },
    selectColorBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    formControlLabel: {
        color: 'white'
    },
    checkbox: {
        color: 'white',
        '&$checked': {
            color: 'white'
        }
    },
});