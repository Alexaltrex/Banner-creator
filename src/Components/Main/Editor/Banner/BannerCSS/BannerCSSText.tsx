import {TextType} from "../../../../../Types/types";
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import clsx from "clsx";
import React, {useEffect, useRef} from "react";
import {getRefLeftPanel, getZoom} from "../../../../../Store/selectors/workspace-selectors";
import BannerTextForm from "./BannerTextForm";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../../../../DragAndDrop/Dnd";

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
const useBannerText = (text: TextType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const zoom = useSelector(getZoom);

    const onMouseEnterHandler = () => {
        dispatch(textAC.setHover(text.id, true))
    };
    const onMouseLeaveHandler = () => {
        dispatch(textAC.setHover(text.id, false))
    };

    const onMouseDownHandler = () => {
        dispatch(textAC.setSelected(text.id, true));

    };
    const onMouseUpHandler = () => {
        dispatch(textAC.setSelected(text.id, false))
    };

    const onClickHandler = () => {
        dispatch(textAC.setEditParameters(text.id, true));
        dispatch(textAC.setSelectedTextId(text.id))
    };
    const cb = () => {
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
            cb();
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

    const [{isDragging}, dragRef] = useDrag({
        item: {
            id: text.id,
            x: text.position.left,
            y: text.position.top,
            type: ItemTypes.TEXT
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

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
        isDragging, dragRef, content, zoom
    }
};

//============== COMPONENT =================
const BannerCSSText: React.FC<PropsType> = ({text}) => {
    const {
        classes, onMouseEnterHandler, onMouseLeaveHandler,
        onMouseDownHandler, onMouseUpHandler, wrapperRef,
        onClickHandler, onDoubleClickHandler,
        isDragging, dragRef, content, zoom
    } = useBannerText(text);

    if (isDragging) {
        return <div ref={dragRef}/>
    }

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
                  ref={dragRef}
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
export default BannerCSSText;

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

