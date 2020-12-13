import {Dialog} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getShowAlarm} from "../../Store/selectors/text-selectors";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import {textAC} from "../../Store/reducers/text-reducer";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {getLang} from "../../Store/selectors/app-selectors";
import {translate} from "../../Utils/lang";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


//========== CUSTOM HOOK ===========
const useAlarm = () => {
    const showAlarm = useSelector(getShowAlarm);
    const lang = useSelector(getLang);
    const title = translate(lang, 'Maximum count of text');
    const content = translate(lang, 'Maximum count of text in trial version of banner creator is 3.');
    const dispatch = useDispatch();
    const onCloseHandler = () => {
        dispatch(textAC.setShowAlarm(false))
    };
    return {
        showAlarm, onCloseHandler, title, content
    }
};

//=========== COMPONENT ============
const Alarm: React.FC<{}> = () => {
    const {
        showAlarm, onCloseHandler, title, content
    } = useAlarm();

    return (
        <Dialog open={showAlarm}
                onClose={onCloseHandler}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                  <Button onClick={onCloseHandler} color="primary" autoFocus variant='outlined'>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
};
export default Alarm;