import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {ReactElement} from "react";
import GradientStyleButton from "./GradientStyleButton";

//============ CUSTOM HOOK ====================
const useGradientStyle = () => {
    const classes = useStyles();
    return {
        classes
    }
};

//============== COMPONENT =================
const GradientStyle: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useGradientStyle()
    return (
        <div className={classes.gradientStyle}>
            <GradientStyleButton gradientStyle='horizontal'/>
            <GradientStyleButton gradientStyle='vertical'/>
            <GradientStyleButton gradientStyle='radial'/>
        </div>
    )
};
export default GradientStyle;

//========================== STYLES ================================================
const useStyles = makeStyles({
    gradientStyle: {
        margin: '20px 10px',
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(4, 1fr)'
    }
});

