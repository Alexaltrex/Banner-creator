import React, {useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core";
import {editorToolbarHeight} from "../../../../Utils/CONST";
import ToolbarZoom from "./ToolbarZoom";
import ToolbarZoomPlus from "./ToolbarZoomPlus";
import ToolbarZoomMinus from "./ToolbarZoomMinus";
import ToolbarDownload from "./ToolbarDownload";
import DownloadDialog from "./DownloadDialog/DownloadDialog";
import {useDispatch} from "react-redux";
import {workspaceAC} from "../../../../Store/reducers/workspace-reducer";

//============ CUSTOM HOOK ====================
const useEditorToolbar = () => {
    const classes = useStyles();

    const refToolbar = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(workspaceAC.setRefToolbar(refToolbar))
    });


    return {
        classes, refToolbar
    }

};

//============== COMPONENT =================
const Toolbar: React.FC<{}> = () => {
    const {
        classes, refToolbar
    } = useEditorToolbar();
    return (
        <div className={classes.editorToolbar}
             ref={refToolbar}
        >
            <div/>
            <div className={classes.centerBlock}>
                <ToolbarZoomMinus />
                <ToolbarZoom />
                <ToolbarZoomPlus />
            </div>
            <div className={classes.rightBlock}>
                <ToolbarDownload/>
            </div>
            <DownloadDialog/>
        </div>
    )
};

export default Toolbar;

//================================ STYLES =======================================
const useStyles = makeStyles({
    editorToolbar: {
        height: editorToolbarHeight,
        boxSizing: 'border-box',
        padding: '0 10px',
        borderBottom: '1px solid #ccc',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridColumnGap: 10,
        alignItems: 'center'
    },
    centerBlock: {
        display: 'flex',
        justifyContent: 'center'
    },
    rightBlock: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    checked: {

    }
});