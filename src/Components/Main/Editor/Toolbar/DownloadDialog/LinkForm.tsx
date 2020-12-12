import React, {useEffect} from "react";
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import {getLink} from "../../../../../Store/selectors/workspace-selectors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {required, shouldNotBeEmpty} from "../../../../../Utils/validators";
import RenderTextFieldStartAdornment from "../../../../common/RenderTextFieldStartAdornment";

//================= CUSTOM FORM HOOK =========================
const useForm = (valid: boolean) => {
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('link-form')));
    };
    const classes = useStyles();
    useEffect(() => {
        dispatch(workspaceAC.setLinkFormIsValid(valid));
    }, [valid]);
    return {
        onChangeHandler, classes
    }
};

//========================== FORM =======================================
const Form: React.FC<FormPropsType> = ({handleSubmit, valid}) => {
    const {
        onChangeHandler, classes
    } = useForm(valid);
    return (
        <form onSubmit={handleSubmit}>
            <Field name='link'
                   autoFocus={true}
                   component={RenderTextFieldStartAdornment}
                   type="text"
                   size='small'
                   className={classes.field}
                   onChange={onChangeHandler}
                   validate={[required, shouldNotBeEmpty]}
            />
        </form>
    )
};

//================================== REDUX-FORM ======================================
const ReduxForm = reduxForm<FormParamsType, FormOwnPropsType>({
    form: 'link-form',
})(Form);

//=========== CUSTOM COMPONENT HOOK =================
const useFileNameForm = () => {
    const dispatch = useDispatch();
    const onSubmitHandler = (value: FormParamsType) => {
        dispatch(workspaceAC.setLink(value.link))
    };
    const link = useSelector(getLink)
    const initialValues = {
        link: link
    };
    return {
        onSubmitHandler, initialValues
    }
};

//================ COMPONENT =======================
const LinkForm: React.FC<{}> = () => {
    const {
        onSubmitHandler, initialValues
    } = useFileNameForm();
    return (
        <ReduxForm onSubmit={onSubmitHandler}
                   initialValues={initialValues}
        />
    )
};
export default LinkForm;

//=================== TYPE ==============
type FormPropsType =
    InjectedFormProps<FormParamsType, FormOwnPropsType>
    & FormOwnPropsType;
type FormParamsType = {
    link: string
}
type FormOwnPropsType = {};

//================= STYLES ================
const useStyles = makeStyles({
    field: {
        width: '100%'
    }
});