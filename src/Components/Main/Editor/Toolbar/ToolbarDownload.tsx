import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {workspaceAC} from "../../../../Store/reducers/workspace-reducer";
import {DownloadCaseType} from "../../../../Types/types";
import {getIsCreated, getLang} from "../../../../Store/selectors/app-selectors";
import {translate} from "../../../../Utils/lang";
import GetAppIcon from '@material-ui/icons/GetApp';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ImageIcon from '@material-ui/icons/Image';
import indigo from "@material-ui/core/colors/indigo";
import LanguageIcon from '@material-ui/icons/Language';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

//============ CUSTOM HOOK ====================
const useToolbarDownload = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const isCreated = useSelector(getIsCreated)
    const downloadLabel = translate(lang, 'Download')

    const dispatch = useDispatch();
    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const downloadCaseArray = ['PNG', 'JPEG', 'HTML'];
    const icons = [
        <CropOriginalIcon/>,
        <ImageIcon/>,
        <LanguageIcon/>
    ];
    const listItemElements = downloadCaseArray.map(
        (el, i) => {
            const onClickListItemHandler = () => {
                dispatch(workspaceAC.setDownloadCase(el as DownloadCaseType));
                dispatch(workspaceAC.setIsDownloadDialogOpen(true));
                handleClose();
            };
            return (
                <ListItem key={el}
                          button
                          onClick={onClickListItemHandler}
                          className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        {icons[i]}
                    </ListItemIcon>
                    <ListItemText primary={el}
                                  classes={{
                                      primary: classes.listItemText
                                  }}
                    />
                </ListItem>
            )
        }
    );
    const handleClose = () => {
        setAnchorEl(null);
    };
    return {
        classes, downloadLabel, anchorEl,
        open, onClickHandler, handleClose,
        listItemElements, isCreated
    }
};

//============== COMPONENT =================
const ToolbarDownload: React.FC<{}> = () => {
    const {
        classes, downloadLabel, anchorEl,
        open, onClickHandler, handleClose,
        listItemElements, isCreated

    } = useToolbarDownload();
    return (
        <>
            <Button className={classes.button}
                    color='primary'
                    disabled={!isCreated}
                    startIcon={<GetAppIcon/>}
                    onClick={onClickHandler}
                    variant='contained'
            >
                {downloadLabel}
            </Button>
            <Popover
                open={open}
                className={classes.popover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    {listItemElements}
                </List>
            </Popover>
        </>
    )
};
export default ToolbarDownload;

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        textTransform: 'none'
    },
    popover: {
        paddingLeft: 5,
        paddingRight: 5
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
        '&:hover': {
            backgroundColor: '#ccc'
        }
    },
    listItemText: {
        fontWeight: 700
    },
    listItemIcon: {
        color: indigo[600],
        minWidth: 30
    }
});