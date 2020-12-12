import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import ImageTabs from "./ImageTabs";
import {useSelector} from "react-redux";
import {getImageTabIndex} from "../../../../../../Store/selectors/editor-selectors";
import {ImageTabIndexEnum} from "../../../../../../Types/types";
import MyImages from "./MyImages/MyImages";
import Settings from "./Settings/Settings";

//============ CUSTOM HOOK ====================
const useImage = () => {
    const classes = useStyles();
    const imageTabIndex = useSelector(getImageTabIndex);
    return {
        classes, imageTabIndex,
    }
};

//============== COMPONENT =================
const Image: React.FC<{}> = () => {
    const {
        classes, imageTabIndex,
    } = useImage();

    return (
        <div className={classes.image}>
            <ImageTabs/>
            {
                imageTabIndex === ImageTabIndexEnum.myImage &&
                    <MyImages/>
            }
            {
                imageTabIndex === ImageTabIndexEnum.imageSetting &&
                <Settings/>
            }
        </div>
    )
};
export default Image;

//========================== STYLES ================================================
const useStyles = makeStyles({
    image: {
        flexGrow: 1,
        padding: '0 10px',
        marginBottom: 10,
        height: 'calc(100vh - 64px - 117px)'
    },
    buttonWrapper: {
        marginTop: 20
    },
    input: {
        display: 'none'
    },
    label: {
        display: 'block'
    },
    button: {
        textTransform: 'none',
        backgroundColor: 'white'
    }
});

