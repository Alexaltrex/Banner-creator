import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TextType} from "../../../../../Types/types";
import {useDispatch, useSelector} from "react-redux";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";
import {textAC} from "../../../../../Store/reducers/text-reducer";

//================CUSTOM COMPONENT HOOK ==========
const useBannerTextFormNative = (text: TextType) => {
    const zoom = useSelector(getZoom);
    const dispatch = useDispatch();
    const props = {
        text: text,
        zoom: zoom
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(text.content);


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const onBlurHandler = () => {
        dispatch(textAC.setContent(text.id, inputValue));
        dispatch(textAC.setEditText(text.id, false));
    };

    const classes = useStylesForm(props);

    useEffect(() => {
        // @ts-ignore
        inputRef.current.size = inputRef.current.value.length +1;
    }, [inputValue]);

    return {
        classes, onChangeHandler, inputValue, onBlurHandler,
        inputRef
    }
}

//==================== COMPONENT =================
const BannerTextForm: React.FC<PropsType> = ({text}) => {
    const {
        classes, onChangeHandler, inputValue, onBlurHandler,
        inputRef
    } = useBannerTextFormNative(text);
    return (
        <div className={classes.form}>
            <input type="text"
                   ref={inputRef}
                   autoFocus={true}
                   className={classes.field}
                   onChange={onChangeHandler}
                   value={inputValue}
                   onBlur={onBlurHandler}
            />
        </div>
    )
};
export default BannerTextForm;

//================= STYLES ================
const useStylesForm = makeStyles({
    form: (props: { text: TextType, zoom: number }) => ({
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0
    }),
    field: (props: { text: TextType, zoom: number }) => ({
        position: 'absolute',
        fontSize: props.text.fontSize * props.zoom / 100,
        fontFamily: props.text.fontFamily,
        lineHeight: `${props.text.fontSize * props.zoom / 100}px`,
        color: props.text.color,
        top: 0,
        left: 0,
        backgroundColor: 'red',//'rgba(227, 242, 253, 0.9)',
        padding: 0,
        border: 'none',
        height: `${props.text.fontSize * props.zoom / 100}px`,
        '&:focus': {
            outline: 'none'
        }
    }),
    hide: {
        display: 'none'
    }
});

//=================== TYPE ==============
type PropsType = {
    text: TextType
}
