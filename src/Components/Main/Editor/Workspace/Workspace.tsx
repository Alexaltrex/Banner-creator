import React from "react";
import {makeStyles} from "@material-ui/core";
import BannerCanvasWrapper from "../Banner/BannerCanvas/BannerCanvasWrapper";
import {mainSidebarWidth, secondSidebarWidth} from "../../../../Utils/CONST";
import LeftPanel from "./LeftPanel/LeftPanel";
import {useSelector} from "react-redux";
import {getTexts} from "../../../../Store/selectors/text-selectors";

//============ CUSTOM HOOK ====================
const useEditorWorkspace = () => {
    const classes = useStyles();
    const texts = useSelector(getTexts);
    const leftPanelIsShow = !!texts.find(el => el.editParameters === true);
    return {
        classes, leftPanelIsShow
    }
};

//============== COMPONENT =================
const Workspace: React.FC<{}> = () => {
    const {
        classes, leftPanelIsShow
    } = useEditorWorkspace();

    return (
        <div className={classes.editorWorkspace}>
            <BannerCanvasWrapper/>
            {
                leftPanelIsShow &&
                <LeftPanel/>
            }
        </div>
    )
};

export default Workspace;

//================================ STYLES =======================================
const useStyles = makeStyles({
    editorWorkspace: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: `calc(100vw - ${mainSidebarWidth}px - ${secondSidebarWidth}px)`,
        boxSizing: 'border-box',
        overflow: 'auto'
    },
    form: {
        width: 100,
        height: 100
    }
});