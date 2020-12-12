import React from "react";
import {makeStyles} from "@material-ui/core";
import SecondarySidebarTitle from "../SecondarySidebarTitle";
import BackgroundTabs from "./BackgroundTabs";
import Color from "./Color/Color";
import {useSelector} from "react-redux";
import {getSecondarySidebarBackgroundTabIndex} from "../../../../../Store/selectors/editor-selectors";
import {BackgroundTabIndexEnum} from "../../../../../Types/types";
import Gradient from "./Gradient/Gradient";
import Texture from "./Texture/Texture";
import Image from "./Image/Image";
import BackgroundBorder from "./BackgroundBorder";

//============ CUSTOM HOOK ====================
const useBackground = () => {
    const classes = useStyles();
    const secondarySidebarBackgroundTabIndex = useSelector(getSecondarySidebarBackgroundTabIndex)
    return {
        classes, secondarySidebarBackgroundTabIndex
    }
};

//============== COMPONENT =================
const Background: React.FC<{}> = () => {
    const {
        classes, secondarySidebarBackgroundTabIndex
    } = useBackground();

    return (
        <div className={classes.Background}>
            <SecondarySidebarTitle title='Background'/>
            <BackgroundTabs/>
            {
                secondarySidebarBackgroundTabIndex === BackgroundTabIndexEnum.color &&
                <Color/>
            }
            {
                secondarySidebarBackgroundTabIndex === BackgroundTabIndexEnum.gradient &&
                <Gradient/>
            }
            {
                secondarySidebarBackgroundTabIndex === BackgroundTabIndexEnum.image &&
                <Image/>
            }
            <BackgroundBorder/>
        </div>
    )
};

export default Background;

//================================ STYLES =======================================
const useStyles = makeStyles({
    title: {
        backgroundColor: 'red'
    },
    Background: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
    }
});