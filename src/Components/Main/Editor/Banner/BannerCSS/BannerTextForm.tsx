import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import {TextType} from "../../../../../Types/types";
import blue from "@material-ui/core/colors/blue";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";

//================= CUSTOM FORM HOOK =========================
const useForm = (text: TextType) => {
    const dispatch = useDispatch();
    const onChangeHandler = () => {
        setTimeout(() => dispatch(submit('text-form')));
    };
    const zoom = useSelector(getZoom);
    const onBlurHandler = () => {
        dispatch(textAC.setEditText(text.id, false));
    };
    const props = {
        text: text,
        zoom: zoom
    };
    const classes = useStylesForm(props);
    return {
        onChangeHandler, classes, onBlurHandler,
    }
};

//========================== FORM =======================================
const Form: React.FC<FormPropsType> = ({handleSubmit, text}) => {
    const {
        onChangeHandler, classes, onBlurHandler,
    } = useForm(text);
    return (
        <form onSubmit={handleSubmit}
              className={classes.form}
        >
            <Field name='text'
                   component='input'
                   type="text"
                   autoFocus={true}
                   className={classes.field}
                   onChange={onChangeHandler}
                   onBlur={onBlurHandler}
            />
        </form>
    )
};

//================================== REDUX-FORM ======================================
const ReduxForm = reduxForm<FormParamsType, FormOwnPropsType>({
    form: 'text-form',
})(Form);

//======================== CUSTOM COMPONENT HOOK =========================
const useBannerTextForm = (id: number, content: string) => {
    const dispatch = useDispatch();
    const onSubmitHandler = (value: FormParamsType) => {
        dispatch(textAC.setContent(id, value.text));
    };
    const initialValues = {
        text: content
    };
    return {
        onSubmitHandler, initialValues
    }
};

//========================= COMPONENT =======================
const BannerTextForm: React.FC<ComponentPropsType> = ({text}) => {
    const {
        onSubmitHandler, initialValues
    } = useBannerTextForm(text.id, text.content);
    return (
        <>
            <ReduxForm onSubmit={onSubmitHandler}
                       text={text}
                       initialValues={initialValues}
            />
        </>
    )
};
export default BannerTextForm;

//=================== TYPE ==============
type FormPropsType =
    InjectedFormProps<FormParamsType, FormOwnPropsType>
    & FormOwnPropsType;
type FormParamsType = {
    text: string
}
type FormOwnPropsType = {
    text: TextType
};
type ComponentPropsType = {
    text: TextType
}

//================= STYLES ================
const useStylesForm = makeStyles({
    form: (props: {text: TextType, zoom: number}) => ({
        zIndex: 10,
        position: 'absolute',
        top: props.text.position.top * props.zoom / 100,
        left: props.text.position.left * props.zoom / 100,
    }),
    field: (props: FormOwnPropsType) => ({
        position: 'absolute',
        fontSize: props.text.fontSize,
        fontFamily: props.text.fontFamily,
        lineHeight: `${props.text.fontSize}px`,
        color: props.text.color,
        top: 0,
        left: 0,
        backgroundColor: blue[50],
        padding: 0,
    }),
    hide: {
        display: 'none'
    }
});
