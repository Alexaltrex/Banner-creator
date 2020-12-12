import React, {ReactElement} from "react";
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {editorAC} from "../../../../../../Store/reducers/editor-reducer";
import {Tooltip} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Div = styled.div`
  background: ${(props) => props.color};
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
`;

//============ CUSTOM HOOK ====================
const useSetColorButton = (color: string) => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(editorAC.setBackgroundStyleColor({color}));
        dispatch(editorAC.setBackgroundStyle('color'));
    };
    const classes = useStyles();
    return {
        onClickHandler, classes
    }
};

//============== COMPONENT =================
const SetColorButton: React.FC<PropsType> = (props): ReactElement => {
    const { color, colorTitle } = props;
    const {
        onClickHandler, classes
    } = useSetColorButton(color);
    return (
        <Tooltip title={colorTitle} placement="right" arrow
                 classes={{
                     tooltip: classes.tooltip,
                     arrow: classes.arrow
                 }}>
            <Div color={color}
                 onClick={onClickHandler}
            />
        </Tooltip>
    )
};
export default SetColorButton;

//========================== TYPE =======================
type PropsType = {
    color: string
    colorTitle: string
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
