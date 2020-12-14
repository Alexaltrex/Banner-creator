import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getSize, getUseBorder} from "../../../../../Store/selectors/editor-selectors";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";
import {ZoomType} from "../../../../../Types/types";
import BannerCSSTexts from "../BannerCSS/BannerCSSTexts";
import BannerCanvasBackgroundMemo from "./BannerCanvasBackground";
import {useDrop, XYCoord} from "react-dnd";
import {ItemType, ItemTypes} from "../../../../../DragAndDrop/Dnd";
import {textAC} from "../../../../../Store/reducers/text-reducer";
import BannerCanvasTextsMemo from "./BannerCanvasTexts";
import BannerCanvasBorderMemo from "./BannerCanvasBorder";

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
    const [, dropRef] = useDrop({
        accept: ItemTypes.TEXT,
        drop(item: ItemType, monitor) {
            const positionCursorDifference = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const posDiffZoom = {
                x: positionCursorDifference.x * 100 / zoom,
                y: positionCursorDifference.y * 100 / zoom,
            };
            dispatch(textAC.setPosition(item.id, posDiffZoom as XYCoord))
        }
    });
    return {
        size, useBorder, zoom, dropRef
    }
};

//==================== COMPONENT ==========================
const BannerCanvasWrapper: React.FC<{}> = () => {
    const {
        size, useBorder, zoom, dropRef
    } = useBannerCanvasWrapper();
    return (
        <Div width={size.width}
             height={size.height}
             zoom={zoom}
             ref={dropRef}
        >
            <BannerCanvasBackgroundMemo/>
            {
                useBorder &&
                <BannerCanvasBorderMemo/>
            }
            <BannerCanvasTextsMemo />
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