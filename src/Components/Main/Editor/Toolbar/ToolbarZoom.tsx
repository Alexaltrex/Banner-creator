import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getZoom} from "../../../../Store/selectors/workspace-selectors";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {workspaceAC} from "../../../../Store/reducers/workspace-reducer";
import {ZoomType} from "../../../../Types/types";

//============ CUSTOM HOOK ====================
const useToolbarZoom = () => {
    const classes = useStyles();
    const zoom = useSelector(getZoom);
    const zoomlabel = `${zoom}%`;
    const dispatch = useDispatch();
    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const zoomArray = [10, 25, 50, 75, 100, 150, 200, 300, 400];
    const listItemElements = zoomArray.map(
        el => {
            const onClickListItemHandler = () => {
                dispatch(workspaceAC.setZoom(el as ZoomType));
                handleClose();
            };
            return (
                <ListItem key={el}
                          button
                          onClick={onClickListItemHandler}
                >
                    {el}
                </ListItem>
            )
        }
    )
    const handleClose = () => {
        setAnchorEl(null);
    };
    return {
        classes, zoomlabel, anchorEl, open,
        onClickHandler, handleClose, listItemElements
    }
};

//============== COMPONENT =================
const ToolbarZoom: React.FC<{}> = () => {
    const {
        classes, zoomlabel, anchorEl, open,
        onClickHandler, handleClose, listItemElements
    } = useToolbarZoom();
    return (
        <>
            <Button className={classes.button}
                    onClick={onClickHandler}
                    variant='outlined'
            >
                {zoomlabel}
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    {listItemElements}
                </List>
            </Popover>
        </>
    )
};
export default ToolbarZoom;

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        minWidth: 36,
        width: 50
    }
});