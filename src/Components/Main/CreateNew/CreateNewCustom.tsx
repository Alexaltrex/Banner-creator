import React, {ReactElement, useState} from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link as RouterLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../Store/selectors/app-selectors";
import {translate} from "../../../Utils/lang";
import {reduxForm, Field, InjectedFormProps, submit} from "redux-form";
import RenderTextField from "../../common/RenderTextField";
import Button from "@material-ui/core/Button";
import {editorAC} from "../../../Store/reducers/editor-reducer";
import {getSize} from "../../../Store/selectors/editor-selectors";
import {appAC} from "../../../Store/reducers/app-reducer";

//================= CUSTOM HOOK =========================
const useForm = () => {
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('size')));
    };
    const widthLabel = translate(lang, 'Width');
    const heightLabel = translate(lang, 'Height');
    const classes = useStylesForm();
    const parseHandler = (value: string) => {
        return value.replace(/\D/ig, '')
    };
    return {
        onChangeHandler, widthLabel, heightLabel,
        classes, parseHandler
    }
}

//========================== FORM =======================================
const Form: React.FC<FormPropsType> = ({handleSubmit}) => {
    const {
        onChangeHandler, widthLabel, heightLabel,
        classes, parseHandler
    } = useForm();
    return (
        <form onSubmit={handleSubmit}
              className={classes.form}
        >
            <div>
                <Field name='width'
                       className={classes.field1}
                       component={RenderTextField}
                       parse={parseHandler}
                       label={widthLabel}
                       size='small'
                       onChange={onChangeHandler}
                />
                <Field name='height'
                       className={classes.field2}
                       component={RenderTextField}
                       label={heightLabel}
                       size='small'
                       onChange={onChangeHandler}
                />
            </div>
        </form>
    )
};

//================================== REDUX-FORM ======================================
const ReduxForm = reduxForm<FormParamsType, FormOwnPropsType>({
    form: 'size',
})(Form);

//======================== CUSTOM HOOK =========================
const useCreateNewCustom = () => {
    const classes = useStyles();
    const [viewForm, setViewForm] = useState(false);
    const onClickHandler = () => {
        setViewForm(true);
    };
    const dispatch = useDispatch();
    const onSubmitHandler = (value: FormParamsType) => {
        dispatch(editorAC.setSize({
            width: +value.width,
            height: +value.height
        }));
        dispatch(appAC.setIsCreated(true));
    };
    const lang = useSelector(getLang);
    const buttonLabel = translate(lang, 'Create');
    const customSizeLabel = translate(lang, 'Custom Size');
    const size = useSelector(getSize);
    const disabled = !(size && size.width && size.height)
    return {
        classes, viewForm, onClickHandler, disabled,
        onSubmitHandler, buttonLabel, customSizeLabel
    }
};

//========================= COMPONENT =======================
const CreateNewCustom: React.FC<{}> = (): ReactElement => {
    const {
        classes, viewForm, onClickHandler, disabled,
        onSubmitHandler, buttonLabel, customSizeLabel
    } = useCreateNewCustom();

    return (
        <Card className={classes.root} elevation={6}>
            {
                !viewForm
                    ? <CardActionArea
                        className={classes.cardActionArea}
                        component='button'
                        onClick={onClickHandler}
                    >
                        <div className={classes.graph}>
                            <AddIcon className={classes.icon}/>
                        </div>
                        <div className={classes.description}>
                            <Typography gutterBottom variant="subtitle2" component="h6" align='center'>
                                {customSizeLabel}
                            </Typography>
                        </div>
                    </CardActionArea>
                    : <div className={classes.formWrapper}>
                        <ReduxForm onSubmit={onSubmitHandler}/>
                        <div className={classes.buttonWrapper}>
                            <Button className={classes.button}
                                    disabled={disabled}
                                    component={RouterLink}
                                    to='/editor'
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    fullWidth
                            >
                                {buttonLabel}
                            </Button>
                        </div>
                    </div>
            }
        </Card>
    )
};
export default CreateNewCustom;

//=================== TYPE ==============
type FormPropsType =
    InjectedFormProps<FormParamsType, FormOwnPropsType>
    & FormOwnPropsType;
type FormParamsType = {
    width: string
    height: string
}
type FormOwnPropsType = {};

//================= STYLES ================
const useStylesForm = makeStyles({
    field1: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    field2: {
        backgroundColor: 'white',
    },
    form: {
        padding: '10px 10px 0 10px',
    }
});

const useStyles = makeStyles({
    root: {
        width: 150,
        height: 150,
        margin: 5,
    },
    cardActionArea: {
        height: '100%',
        //display: 'flex',
        //flexDirection: 'column',
        //justifyContent: 'flex-end',
        position: 'relative'
    },
    icon: {
        transform: 'scale(3)'
    },
    graph: {
        width: '100%',
        //flexGrow: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110
    },
    description: {
        padding: 5,
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    formWrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonWrapper: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px'
    },
    button: {
        textTransform: 'none'
    }
});