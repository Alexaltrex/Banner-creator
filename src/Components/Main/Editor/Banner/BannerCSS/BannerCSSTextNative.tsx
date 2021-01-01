import {TextType} from "../../../../../Types/types";
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import clsx from "clsx";
import React, {useEffect, useRef} from "react";
import {getRefLeftPanel, getZoom} from "../../../../../Store/selectors/workspace-selectors";
import BannerTextForm from "./BannerTextForm";

//==================== STYLED ===================
const Span = styled.span`
    position: absolute;
    top: ${(props: PropsSpanType) => `${props.top * props.zoom / 100}px`};
    left: ${(props: PropsSpanType) => `${props.left * props.zoom / 100}px`};
    color: ${(props: PropsSpanType) => props.color};
    font-size: ${(props: PropsSpanType) => `${props.fontSize * props.zoom / 100}px`};
    line-height: ${(props: PropsSpanType) => `${props.fontSize * props.zoom / 100}px`};
    font-family: ${(props: PropsSpanType) => props.fontFamily};
    font-style: ${(props: PropsSpanType) => props.fontStyle};
    user-select: none;    
`;

//============ CUSTOM HOOK ====================
const useBannerTextNative = (text: TextType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const zoom = useSelector(getZoom);

    const onMouseEnterHandler = () => {
        dispatch(textAC.setHover(text.id, true))
    };
    const onMouseLeaveHandler = () => {
        dispatch(textAC.setHover(text.id, false));
    };

    const onMouseDownHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(textAC.setSelected(text.id, true));
        const spanEl = e.currentTarget.getBoundingClientRect();
        dispatch(textAC.setCursorOnTextPosition(
            e.clientX - spanEl.left,
            e.clientY - spanEl.top
        ));
        dispatch(textAC.setMovedTextId(text.id));

    };
    const onMouseUpHandler = () => {
        dispatch(textAC.setSelected(text.id, false));
        dispatch(textAC.setMovedTextId(null));
    };

    const onClickHandler = () => {
        dispatch(textAC.setEditParameters(text.id, true));
        dispatch(textAC.setSelectedTextId(text.id));
    };
    const onOutsideClickCallback = () => {
        dispatch(textAC.setEditParameters(text.id, false));
    };
    const onDoubleClickHandler = () => {
        dispatch(textAC.setEditText(text.id, true));
    };

    const refLeftPanel = useSelector(getRefLeftPanel) as React.MutableRefObject<null>;
    const onOutsideClickHandler = (event: MouseEvent): void => {
        if (
            // @ts-ignore
            !wrapperRef.current.contains(event.target) &&
            // @ts-ignore
            !refLeftPanel.current.contains(event.target)
        ) {
            onOutsideClickCallback();
        }
    };

    useEffect(() => {
        if (text.editParameters) {
            document.addEventListener("mousedown", onOutsideClickHandler);
        }

        return () => {
            document.removeEventListener("mousedown", onOutsideClickHandler);
        };
    }, [onOutsideClickHandler, text.editParameters]);


    let content = text.content;
    if (text.lowerCase) {
        content = content.toLowerCase();
    }
    if (text.upperCase) {
        content = content.toUpperCase();
    }

    return {
        classes, onMouseEnterHandler, onMouseLeaveHandler,
        onMouseDownHandler, onMouseUpHandler, wrapperRef,
        onClickHandler, onDoubleClickHandler,
        content, zoom,
    }
};

//============== COMPONENT =================
const BannerCSSTextNative: React.FC<PropsType> = ({text}) => {
    const {
        classes, onMouseEnterHandler, onMouseLeaveHandler,
        onMouseDownHandler, onMouseUpHandler, wrapperRef,
        onClickHandler, onDoubleClickHandler,
        content, zoom,
    } = useBannerTextNative(text);

    return (
        <div ref={wrapperRef}>
            {
                text.editText &&
                <BannerTextForm text={text}/>
            }
            <Span fontSize={text.fontSize}
                  fontFamily={text.fontFamily}
                  fontStyle={text.fontStyle}
                  color={text.color}
                  top={text.position.top}
                  left={text.position.left}
                  zoom={zoom}
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}
                  onMouseDown={onMouseDownHandler}
                  onMouseUp={onMouseUpHandler}
                  onClick={onClickHandler}
                  onDoubleClick={onDoubleClickHandler}
                  className={clsx(
                      text.hover && classes.hover,
                      text.editParameters && classes.clicked,
                      text.editText && classes.hide
                  )}
            >
                {content}
            </Span>
        </div>
    )
};
export default BannerCSSTextNative;

//============== TYPE ================
type PropsType = {
    text: TextType
}
type PropsSpanType = {
    top: number
    left: number
    fontSize: number
    fontFamily: string
    fontStyle: string
    color: string
    zoom: number
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    hover: {
        outline: '1px solid #ccc',
        cursor: 'move'
    },
    clicked: {
        outline: '2px solid black',
    },
    protect: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    hide: {
        display: 'none'
    }
});

