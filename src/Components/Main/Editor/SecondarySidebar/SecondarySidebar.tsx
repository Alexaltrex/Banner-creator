import React from "react";
import {useSelector} from "react-redux";
import {getMainSidebarItem} from "../../../../Store/selectors/editor-selectors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Background from "./SecondarySidebarBackground/Background";
import {MainSidebarItemEnum} from "../../../../Types/types";
import Text from "./SecondarySidebarText/Text";

//============ CUSTOM HOOK ====================
const useSecondarySidebar = () => {
    const classes = useStyles();
    const mainSidebarItem = useSelector(getMainSidebarItem);
    return {
        classes, mainSidebarItem
    }
}

//============== COMPONENT =================
const SecondarySidebar: React.FC<{}> = () => {
    const {
        classes, mainSidebarItem
    } = useSecondarySidebar();
    return (
        <div className={classes.secondarySidebar}>
            {
                mainSidebarItem === MainSidebarItemEnum.background
                && <Background/>
            }
            {
                mainSidebarItem === MainSidebarItemEnum.text
                && <Text/>
            }
        </div>
    )
};
export default SecondarySidebar;

//========================== STYLES ================================================
const useStyles = makeStyles({
    secondarySidebar: {
        height: 'calc(100vh - 64px)',
    }
})