import React from "react";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import SelectColorPopover from "./SelectColorPopover";
import {useSelector} from "react-redux";
import {getLang} from "../../Store/selectors/app-selectors";
import {translate} from "../../Utils/lang";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Div = styled.div`
  background: ${(props: DivPropsType) => props.enable ? props.color : 'none'};;
  width: ${(props: DivPropsType) => `${props.size}px`};
  height: ${(props: DivPropsType) => `${props.size}px`};
  border-radius: 2px;
  border: 2px solid #fff;
  cursor: ${(props: DivPropsType) => props.enable ? 'pointer' : 'auto'};
  display: flex;
  justify-content:center;
  align-items: center;
`;

//==================== CUSTOM HOOK ==========================
const useSelectColorButtonCustom = (
    enable: boolean, header: string, tipTitle: string | undefined
) => {
    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        if (enable) {
            setAnchorEl(event.currentTarget);
        }
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const lang = useSelector(getLang);
    const headerLabel = translate(lang, header);
    const tipTitleLabel = tipTitle ? translate(lang, tipTitle) : '';
    const classes = useStyles();
    return {
        onClickHandler, open, anchorEl, classes,
        handleClose, headerLabel, tipTitleLabel,
    }
};

//===================== COMPONENT ===========================
const SelectColorButtonCustom: React.FC<PropsType> = (props) => {
    const {
        color, enable, onPickColorHandler, size = 50, tipTitle, header,
        anchorOriginVertical = 'top', anchorOriginHorizontal = 'left',
        transformOriginVertical = 'top', transformOriginHorizontal = 'left'
    } = props;

    const {
        onClickHandler, open, anchorEl, classes,
        handleClose, headerLabel, tipTitleLabel,
    } = useSelectColorButtonCustom(enable, header, tipTitle);

    return (
        <>
            <>
                {
                    tipTitle
                        ? <Tooltip title={tipTitleLabel} placement="right" arrow
                                   classes={{
                                       tooltip: classes.tooltip,
                                       arrow: classes.arrow
                                   }}>
                            <Div size={size}
                                 enable={enable}
                                 color={color}
                                 onClick={onClickHandler}
                            />
                        </Tooltip>
                        : <Div size={size}
                               enable={enable}
                               color={color}
                               onClick={onClickHandler}
                        />
                }
            </>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: anchorOriginVertical,
                    horizontal: anchorOriginHorizontal,
                }}
                transformOrigin={{
                    vertical: transformOriginVertical,
                    horizontal: transformOriginHorizontal,
                }}
            >
                <SelectColorPopover header={headerLabel}
                                    onPickColor={onPickColorHandler}
                                    handleClose={handleClose}
                                    propsColor={color}
                />
            </Popover>
        </>
    )
};
export default SelectColorButtonCustom;

//==================== TYPE ===================
type PropsType = {
    tipTitle?: string | undefined
    color: string
    enable: boolean
    onPickColorHandler: (color: string) => void
    size?: number
    header: string
    anchorOriginVertical?: 'top' | 'center' | 'bottom' | number
    anchorOriginHorizontal?: 'left' | 'center' | 'right' | number
    transformOriginVertical?: 'top' | 'center' | 'bottom' | number
    transformOriginHorizontal?: 'left' | 'center' | 'right' | number
};
type DivPropsType = {
    size: number
    color: string
    enable: boolean
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    }
});

