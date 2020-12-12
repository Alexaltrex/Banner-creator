import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";


//============ CUSTOM HOOK ====================
const useScndSdbrBckgrndTexture = () => {
    const classes = useStyles();
    return {
        classes
    }
};

//============== COMPONENT =================
const Texture: React.FC<{}> = () => {
    const {
        classes
    } = useScndSdbrBckgrndTexture()
    return (
        <div className={classes.scndSdbrBckgrndTexture}>
            Texture
        </div>
    )
};
export default Texture;

//========================== STYLES ================================================
const useStyles = makeStyles({
    scndSdbrBckgrndTexture: {

    }
});

