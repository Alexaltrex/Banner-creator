import React, {useRef} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getSize, getUseBorder} from "../../../../../Store/selectors/editor-selectors";
import {getWrapperPosition, getZoom} from "../../../../../Store/selectors/workspace-selectors";
import {ZoomType} from "../../../../../Types/types";
import BannerCSSTexts from "../BannerCSS/BannerCSSTexts";
import BannerCanvasBackgroundMemo from "./BannerCanvasBackground";
import BannerCanvasBorderMemo from "./BannerCanvasBorder";
import throttle from "lodash/throttle";
import {
    getCursorOnTextPosition,
    getMovedTextId,
} from "../../../../../Store/selectors/text-selectors";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import BannerCanvasTextsMemo from "./BannerCanvasTexts";

const Div = styled.div`
  width: ${(props: PropsType) => props.width ? `${props.width * props.zoom / 100}px` : '0px'};
  height: ${(props: PropsType) => props.height ? `${props.height * props.zoom / 100}px` : '0px'};
  position: relative;  
`;

//=================== CUSTOM HOOK =======================
const useBannerCanvasWrapper = () => {
    const size = useSelector(getSize);
    const useBorder = useSelector(getUseBorder);
    const zoom = useSelector(getZoom);
    const dispatch = useDispatch();
    const ref = useRef(null);

    const wrapperPosition = useSelector(getWrapperPosition);
    const cursorOnTextPosition = useSelector(getCursorOnTextPosition);
    const movedTextId = useSelector(getMovedTextId);

    const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (movedTextId) { // режим перемещения текста
            const cursorX = e.clientX; // координаты курсора относительно окна
            const cursorY = e.clientY;
            const wrapperX = wrapperPosition.x; // координаты левого верхнего угла канваса относительно окна
            const wrapperY = wrapperPosition.y;
            const cursorOnTextPositionX = cursorOnTextPosition.x; // смещение курсора относительно левого верхнего угла текста
            const cursorOnTextPositionY = cursorOnTextPosition.y;
            const x = (cursorX - wrapperX - cursorOnTextPositionX) * 100 / zoom; // коорд. левого верхего угла текста относительно
            const y = (cursorY - wrapperY - cursorOnTextPositionY) * 100 / zoom; // левого верхего угла канваса
            dispatch(textAC.setPosition(movedTextId, x, y));
        }
    };
    const onMouseMoveThrottle = throttle(onMouseMoveHandler, 500);

    return {
        size, useBorder, zoom, ref, onMouseMoveThrottle
    }
};

//==================== COMPONENT ==========================
const BannerCanvasWrapper: React.FC<{}> = () => {
    const {
        size, useBorder, zoom, ref, onMouseMoveThrottle
    } = useBannerCanvasWrapper();
    // BannerCSSTexts - отображается в приложении
    // BannerCanvasTextsMemo - выводится в файл
    return (
        <Div width={size.width}
             height={size.height}
             zoom={zoom}
             ref={ref}
             onMouseMove={onMouseMoveThrottle}
        >
            <BannerCanvasBackgroundMemo/>
            {
                useBorder &&
                <BannerCanvasBorderMemo/>
            }
            <BannerCanvasTextsMemo/>
            <BannerCSSTexts/>

        </Div>
    )
};
export default BannerCanvasWrapper;

//================= TYPE ==================
type PropsType = {
    width: number | null
    height: number | null
    zoom: ZoomType
}