import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Select, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getScaleMode} from "../../../../../../../Store/selectors/editor-selectors";
import {getLang} from "../../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../../Utils/lang";
import {ScaleModeType} from "../../../../../../../Types/types";
import {editorAC} from "../../../../../../../Store/reducers/editor-reducer";
import brown from "@material-ui/core/colors/brown";

//============ CUSTOM HOOK ====================
const useScaleMode = () => {
    const classes = useStyles();
    const scaleMode = useSelector(getScaleMode);
    const lang = useSelector(getLang);
    const labels = ['Maintain aspect', 'Exact fit', 'Scale crop', 'No scale'];
    const optionElements = labels.map(
        el => <option key={el} value={el}>{translate(lang, el)}</option>
    );
    const scaleModeLabel = translate(lang, 'Scale mode');
    const dispatch = useDispatch()
    const onChangeHandler = (event: React.ChangeEvent<{name?: string; value: unknown }>) => {
        const value = event.target.value as ScaleModeType
        dispatch(editorAC.setScaleMode(value))
    };
    return {
        classes, scaleMode, onChangeHandler, optionElements,
        scaleModeLabel
    }
};

//================= COMPONENT ========================
const SettingsScaleMode: React.FC<{}> = () => {
    const {
        classes, scaleMode, onChangeHandler, optionElements,
        scaleModeLabel
    } = useScaleMode();

    return (
        <div className={classes.scaleMode}>
            <Typography className={classes.typography}
                        variant='body2'
            >
                {scaleModeLabel}
            </Typography>
            <Select
                native
                value={scaleMode}
                onChange={onChangeHandler}
                className={classes.select}
                inputProps={{
                    name: 'scale-mode',
                    id: 'scale-mode-native-simple',
                }}
            >
                {optionElements}
            </Select>
        </div>
    )
};
export default SettingsScaleMode

//========================== STYLES ================================================
const useStyles = makeStyles({
    scaleMode: {
        margin: '10px 0 20px'
    },
    select: {
        backgroundColor: brown[100]
    },
    typography: {
        color: '#fff',
        marginBottom: 5
    },
});