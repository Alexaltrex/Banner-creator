import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slider from "@material-ui/core/Slider";
import {useDispatch, useSelector} from "react-redux";
import {getJpegQuality} from "../../../../../Store/selectors/workspace-selectors";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import {Typography} from "@material-ui/core";

//============ CUSTOM HOOK ===============
const useJpegQuality = () => {
    const jpegQuality = useSelector(getJpegQuality);
    const dispatch = useDispatch();
    const onChangeHandler = (e: any, value: number | number[]) => {
        dispatch(workspaceAC.setJpegQuality(value as number))
    };
    const classes = useStyles();
    const marks = [
        {
            value: 0.1,
            label: '0.1',
        },
        {
            value: 0.8,
            label: '0.8',
        },
        {
            value: 1,
            label: '1.0',
        },
    ];
    return {
        classes, jpegQuality, onChangeHandler,
        marks
    }
};

//============= COMPONENT =================
const JpegQuality: React.FC<{}> = () => {
    const {
        classes, jpegQuality, onChangeHandler,
        marks
    } = useJpegQuality();
    return (
        <div className={classes.jpegQuality}>
            <Typography>Quality of jpeg</Typography>
            <Slider className={classes.slider}
                    min={.1}
                    max={1}
                    step={.1}
                    value={jpegQuality}
                    onChange={onChangeHandler}
                    marks={marks}
                    valueLabelDisplay="auto"
            />
        </div>
    )
};
export default JpegQuality;

//============== STYLES ===================
const useStyles = makeStyles({
    slider: {
        margin: '10px 0',
    },
    jpegQuality: {
        marginTop: 10
    }
});