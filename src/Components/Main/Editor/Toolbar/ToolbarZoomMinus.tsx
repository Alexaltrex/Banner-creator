import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getZoom} from "../../../../Store/selectors/workspace-selectors";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {workspaceAC} from "../../../../Store/reducers/workspace-reducer";
import {ZoomType} from "../../../../Types/types";

//============ CUSTOM HOOK ====================
const useToolbarZoomMinus = () => {
    const classes = useStyles();
    const zoom = useSelector(getZoom);
    const zoomArray = [10, 25, 50, 75, 100, 150, 200, 300, 400];
    const dispatch = useDispatch();
    const onClickHandler = () => {
        let index = zoomArray.findIndex(el => el === zoom);
        if (index === 0) {
            index = zoomArray.length - 1;
        } else {
            index -= 1;
        }
        dispatch(workspaceAC.setZoom(zoomArray[index] as ZoomType))
    };
    const disabled = zoom === zoomArray[0];
    return {
        classes, onClickHandler, disabled
    }
};

//============== COMPONENT =================
const ToolbarZoomMinus: React.FC<{}> = () => {
    const {
        classes, onClickHandler, disabled
    } = useToolbarZoomMinus();
    return (
        <>
            <Button className={classes.button}
                    disabled={disabled}
                    onClick={onClickHandler}
            >
                <Typography variant='h6'>
                    -
                </Typography>

            </Button>

        </>
    )
};
export default ToolbarZoomMinus;

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        minWidth: 44
    }
});