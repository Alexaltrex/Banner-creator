import React, {useEffect} from "react";
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import RenderTextField from "../../../../common/RenderTextField";
import {getFileName} from "../../../../../Store/selectors/workspace-selectors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {required, shouldNotBeEmpty} from "../../../../../Utils/validators";

//================= CUSTOM FORM HOOK =========================
const useForm = (valid: boolean) => {
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('fileName-form')));
    };
    const classes = useStyles();
    useEffect(() => {
        dispatch(workspaceAC.setFileNameFormIsValid(valid));
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
            <Field name='fileName'
                   autoFocus={true}
                   component={RenderTextField}
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
    form: 'fileName-form',
})(Form);

//=========== CUSTOM COMPONENT HOOK =================
const useFileNameForm = () => {
    const dispatch = useDispatch();
    const onSubmitHandler = (value: FormParamsType) => {
        dispatch(workspaceAC.setFileName(value.fileName))
    };
    const fileName = useSelector(getFileName)
    const initialValues = {
        fileName: fileName
    };
    return {
        onSubmitHandler, initialValues
    }
};

//================ COMPONENT =======================
const FileNameForm: React.FC<{}> = () => {
    const {
        onSubmitHandler, initialValues
    } = useFileNameForm();
    return (
        <ReduxForm onSubmit={onSubmitHandler}
                   initialValues={initialValues}
        />
    )
};
export default FileNameForm;

//=================== TYPE ==============
type FormPropsType =
    InjectedFormProps<FormParamsType, FormOwnPropsType>
    & FormOwnPropsType;
type FormParamsType = {
    fileName: string
}
type FormOwnPropsType = {};

//================= STYLES ================
const useStyles = makeStyles({
    field: {
        width: '100%'
    }
});