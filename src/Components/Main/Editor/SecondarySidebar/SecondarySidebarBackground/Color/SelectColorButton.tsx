import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import {Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../Utils/lang";
import SelectColorPopover from "../../../../../common/SelectColorPopover";
import Popover from "@material-ui/core/Popover/Popover";

const Div = styled.div`
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content:center;
  align-items: center;
`;

//============ CUSTOM HOOK ====================
const useSelectColorButton = () => {
    const lang = useSelector(getLang);
    const title = translate(lang, 'Select color');
    const header = translate(lang, 'Select background color');
    const dispatch = useDispatch();
    const onPickColorHandler = (color: string) => {
        dispatch(editorAC.setBackgroundStyleColor({color}))
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const classes = useStyles();
    return {
        title, onPickColorHandler, header,
        onClickHandler, open, anchorEl,
        handleClose, classes
    }
}

//============== COMPONENT =================
const SelectColorButton: React.FC<{}> = () => {
    const {
        title, onPickColorHandler, header,
        onClickHandler, open, anchorEl,
        handleClose, classes
    } = useSelectColorButton();
    return (
        <>
            <Tooltip title={title} placement="right" arrow
                     classes={{
                         tooltip: classes.tooltip,
                         arrow: classes.arrow
                     }}>
                <Div onClick={onClickHandler}
                >
                    <AddIcon fontSize='large'/>
                </Div>
            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <SelectColorPopover header={header}
                                    onPickColor={onPickColorHandler}
                                    handleClose={handleClose}
                                    propsColor='#FFF'
                />
            </Popover>

        </>
    )
};
export default SelectColorButton;

//================================ STYLES =======================================
const useStyles = makeStyles({
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    }
});





