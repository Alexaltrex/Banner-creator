import {TextType} from "../../../../../Types/types";
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import clsx from "clsx";
import React, {useEffect, useRef} from "react";
import {getRefLeftPanel, getRefToolbar, getZoom} from "../../../../../Store/selectors/workspace-selectors";
import Rotator from "./Rotator";
import {getRotatedTextId} from "../../../../../Store/selectors/text-selectors";
import BannerTextForm from "./BannerTextForm";

//==================== STYLED ===================
const Wrapper = styled.div`
    position: absolute;
    top: ${(props: PropsWrapperType) => `${props.top * props.zoom / 100}px`};
    left: ${(props: PropsWrapperType) => `${props.left * props.zoom / 100}px`};
    
`;

const Span = styled.span`
    color: ${(props: PropsSpanType) => props.color};
    font-size: ${(props: PropsSpanType) => `${props.fontSize * props.zoom / 100}px`};
    line-height: ${(props: PropsSpanType) => `${props.fontSize * props.zoom / 100}px`};
    font-family: ${(props: PropsSpanType) => props.fontFamily};
    font-style: ${(props: PropsSpanType) => props.fontStyle};
    transform-origin: center;    
    transform: ${(props: PropsSpanType) => `rotate(${props.angle}deg)`};
    user-select: none;
    display: ${(props: PropsSpanType) => props.editText ? 'none' : 'inline-block'};    
`;

//============ CUSTOM HOOK ====================
const useBannerTextNative = (text: TextType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const zoom = useSelector(getZoom);
    const rotatedTextId = useSelector(getRotatedTextId);

    const onMouseEnterHandler = () => {
        dispatch(textAC.setHover(text.id, true))
    };
    const onMouseLeaveHandler = () => {
        dispatch(textAC.setHover(text.id, false));
    };

    const onMouseDownHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(textAC.setSelected(text.id, true)); // определяем id выделенного текста
        // определяем смещение клика относительно левого верхнего угла Wrapper
        const wrapper: DOMRect = wrapperRef!.current!.getBoundingClientRect();
        dispatch(textAC.setCursorOnTextPosition(
            e.clientX - wrapper.left,
            e.clientY - wrapper.top
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
    const refToolbar = useSelector(getRefToolbar) as React.MutableRefObject<null>;
    const onOutsideClickHandler = (event: MouseEvent): void => { // обработчик клика вне текста
        if (
            // @ts-ignore
            !wrapperRef.current.contains(event.target) && // если то, по чему кликнули не текст или его потомок
            // @ts-ignore
            !refLeftPanel.current.contains(event.target) && // и не левая панель инструментов
            // @ts-ignore
            !refToolbar.current.contains(event.target) // и не верхняя панель инструментов
        ) {
            onOutsideClickCallback(); // выполнить колбэк - снять выделение с текста
        }
    };

    useEffect(
        () => { // клик вне текста снимает с него выделение
            if (text.editParameters) { // эффект применяется если текст выделен
                document.addEventListener("mousedown", onOutsideClickHandler);

                return () => {
                    document.removeEventListener("mousedown", onOutsideClickHandler);
                };
            }
        },
        [onOutsideClickHandler, text.editParameters]
    );

    // поднять кнопку мыши - снять выделение с кнопки поворота
    const onMouseUpDocumentHandler = () => {
        //console.log('onMouseUpDocumentHandler')
        dispatch(textAC.setRotatedTextId(null))
    };
    useEffect(() => {
        if (rotatedTextId) {
            //console.log('подписка');
            document.addEventListener('mouseup', onMouseUpDocumentHandler);

            return () => {
                //console.log('отписка');
                document.removeEventListener("mouseup", onMouseUpDocumentHandler);
            }

        }
    });

    // при выделение текста - отправить в store ширину и высоту текущего выделенного текста
    useEffect(() => {
        if (text.selected) {
            const textEl: DOMRect = wrapperRef!.current!.getBoundingClientRect();
            dispatch(textAC.setSizeOfSelectedText(textEl.width, textEl.height))
        }
    }, [text.selected]);

    // при изменении параметров, влияющих на габариты текста - отправить в store ширину и высоту текущего текста
    useEffect(() => {
            const textEl: DOMRect = wrapperRef!.current!.getBoundingClientRect();
            dispatch(textAC.setSize(text.id, textEl.width, textEl.height))
    }, [text.content, text.upperCase, text.lowerCase, text.fontStyle, text.fontSize]);




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
const BannerCSSText: React.FC<PropsType> = ({text}) => {
    const {
        classes, onMouseEnterHandler, onMouseLeaveHandler,
        onMouseDownHandler, onMouseUpHandler, wrapperRef,
        onClickHandler, onDoubleClickHandler,
        content, zoom,
    } = useBannerTextNative(text);

    return (
        <Wrapper ref={wrapperRef}
                 top={text.position.top}
                 left={text.position.left}
                 zoom={zoom}
        >
            {
                !text.editText && text.editParameters && <Rotator id={text.id}/>
            }

            {
                text.editText && <BannerTextForm text={text}/>
            }

            <Span fontSize={text.fontSize}
                  fontFamily={text.fontFamily}
                  fontStyle={text.fontStyle}
                  color={text.color}
                  editText={text.editText}
                  zoom={zoom}
                  angle={text.angle}
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}
                  onMouseDown={onMouseDownHandler}
                  onMouseUp={onMouseUpHandler}
                  onClick={onClickHandler}
                  onDoubleClick={onDoubleClickHandler}
                  className={clsx(
                      text.hover && classes.hover,
                      text.editParameters && classes.clicked
                  )}
            >
                {content}
            </Span>

        </Wrapper>
    )
};
export default BannerCSSText;

//============== TYPE ================
type PropsType = {
    text: TextType
}
type PropsWrapperType = {
    top: number
    left: number
    zoom: number
}
type PropsSpanType = {
    fontSize: number
    fontFamily: string
    fontStyle: string
    color: string
    zoom: number
    angle: number
    editText: boolean
}

//================================ STYLES =======================================
const useStyles = makeStyles({
    hover: {
        outline: '1px solid #ccc',
        cursor: 'move'
    },
    clicked: {
        outline: '1px solid black',
    }
});

