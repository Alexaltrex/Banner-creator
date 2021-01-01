import React from "react";
import {makeStyles} from "@material-ui/core";
import SecondarySidebarTitle from "../SecondarySidebarTitle";
import Button from "@material-ui/core/Button";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import {useDispatch, useSelector} from "react-redux";
import {translate} from "../../../../../Utils/lang";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import brown from "@material-ui/core/colors/brown";

//============ CUSTOM HOOK ====================
const useSecondSidebarText = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const labels = [];
    labels[0] = translate(lang, 'Add header');
    labels[1] = translate(lang, 'Add subheader');
    labels[2] = translate(lang, 'Add body text');
    const dispatch = useDispatch();
    const onClickHandler = [];
    onClickHandler[0] = () => {
        dispatch(textAC.addText('header'));
    };
    onClickHandler[1] = () => {
        dispatch(textAC.addText('subheader'));
    };
    onClickHandler[2] = () => {
        dispatch(textAC.addText('body'));
    };
    return {classes, labels, onClickHandler}
};

//============== COMPONENT =================
const Text: React.FC<{}> = () => {
    const {classes, labels, onClickHandler} = useSecondSidebarText();
    return (
        <div>
            <SecondarySidebarTitle title='Add text' />
            <div className={classes.buttons}>
                <Button variant='outlined'
                        onClick={onClickHandler[0]}
                        fullWidth
                        className={classes.button}
                        classes={{
                            label: classes.label1
                        }}
                >
                    {labels[0]}
                </Button>
                <Button variant='outlined'
                        onClick={onClickHandler[1]}
                        fullWidth
                        className={classes.button}
                        classes={{
                            label: classes.label2
                        }}
                >
                    {labels[1]}
                </Button>
                <Button variant='outlined'
                        onClick={onClickHandler[2]}
                        fullWidth
                        className={classes.button}
                        classes={{
                            label: classes.label3
                        }}
                >
                    {labels[2]}
                </Button>
            </div>
        </div>
    )
};
export default Text;

//================================ STYLES =======================================
const useStyles = makeStyles({
    buttons: {
        margin: 10
    },
    button: {
        height: 40,
        textTransform: 'none',
        color: '#eee',
        backgroundColor: brown[400],
        //border: '1px solid #ccc',
        border: 'none',
        '&:not(:last-child)': {
            marginBottom: 10,
        },
        '&:hover': {
            backgroundColor: brown[300],
            color: '#fff'
        }
    },
    label1: {
        fontSize: '32px',
        lineHeight: '32px'
    },
    label2: {
        fontSize: '24px',
        lineHeight: '24px'
    },
    label3: {
        fontSize: '16px',
        lineHeight: '16px'
    },
});