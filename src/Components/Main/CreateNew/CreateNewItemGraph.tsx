import React from "react";
import {ReactElement} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import indigo from "@material-ui/core/colors/indigo";

//================= COMPONENTS ========================
const CreateNewItemGraph: React.FC<PropsType> = (props): ReactElement => {
    const {width, height} = props;
    let w = 130;
    let h = height * w / width;
    if (h > 68) {
        h = 68;
        w = h * width / height;
    }
    const useStyles = makeStyles({
        graph: {
            width: w,
            height: h,
            border: '3px solid darkblue',
            boxSizing: 'border-box',
            backgroundColor: indigo[400]
        },
    });
    const classes = useStyles()

    return (
        <div className={classes.graph}/>
    )
};
export default CreateNewItemGraph;

//============== TYPE ====================
type PropsType = {
    width: number
    height: number
}