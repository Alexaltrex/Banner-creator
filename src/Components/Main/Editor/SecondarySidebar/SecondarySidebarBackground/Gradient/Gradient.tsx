import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {ReactElement} from "react";
import GradientStyle from "./GradientStyle";
import GradientColor from "./GradientColor";

//============ CUSTOM HOOK ====================
const useGradient = () => {
    const classes = useStyles();
    return {
        classes
    }
};

//============== COMPONENT =================
const Gradient: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useGradient();
    return (
        <div className={classes.gradient}>
            <GradientStyle/>
            <GradientColor/>
        </div>
    )
};
export default Gradient;

//========================== STYLES ================================================
const useStyles = makeStyles({
    gradient: {
        flexGrow: 1
    }
});

