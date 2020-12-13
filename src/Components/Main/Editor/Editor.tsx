import React from "react";
import {useSelector} from "react-redux";
import {getShowSecondSidebar} from "../../../Store/selectors/editor-selectors";
import {makeStyles} from "@material-ui/core";
import brown from "@material-ui/core/colors/brown";
import MainSidebar from "./MainSidebar/MainSidebar";
import {mainSidebarWidth, secondSidebarWidth} from "../../../Utils/CONST";
import SecondarySidebar from "./SecondarySidebar/SecondarySidebar";
import clsx from "clsx";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import grey from "@material-ui/core/colors/grey";
import Alarm from "../../common/Alarm";

//============ CUSTOM HOOK ====================
const useEditor = () => {
    const classes = useStyles();
    const showSecondSidebar = useSelector(getShowSecondSidebar)
    return {classes, showSecondSidebar}
};

//============== COMPONENT =================
const Editor:React.FC<{}> = () => {
    const {
        classes, showSecondSidebar
    } = useEditor();
    return (
        <div className={classes.editor}>
            <div className={classes.mainSidebar}>
                <MainSidebar/>
            </div>
            <div className={clsx(classes.secondSidebarWrapper, !showSecondSidebar && classes.secondSidebarWrapperHide)}>
                <div className={classes.secondSidebar}>
                    <SecondarySidebar/>
                </div>
            </div>
            <div className={classes.workspace} >
                <Toolbar/>
                <Workspace/>
            </div>
            <Alarm/>
        </div>
    )
};
export default Editor;

//================================ STYLES =======================================
const useStyles = makeStyles({
    editor: {
        display: 'flex',
        height: 'calc(100vh - 64px)',
        width: '100vw'
    },
    mainSidebar: {
        width: mainSidebarWidth,
        flexShrink: 0,
        backgroundColor: brown[800],
        height: 'calc(100vh - 64px)',
    },
    secondSidebarWrapper: {
        width: secondSidebarWidth,
        flexShrink: 0,
        backgroundColor: brown[600],
        position: 'relative',
        transition: 'width .3s',
        overflow: 'hidden',
        height: 'calc(100vh - 64px)',
    },
    secondSidebarWrapperHide: {
        width: 0,
    },
    secondSidebar: {
        position: 'absolute',
        width: secondSidebarWidth,
        right: 0,
        height: 'calc(100vh - 64px)',
    },
    workspace: {
        flexGrow: 1,
        width: `calc(100vw - ${mainSidebarWidth}px - ${secondSidebarWidth}px)`,
        height: 'calc(100vh - 64px)',
        backgroundColor: grey[200],
        display: 'flex',
        flexDirection: 'column'
    }
});
