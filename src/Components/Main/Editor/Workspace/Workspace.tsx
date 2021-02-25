import React, {useEffect, useState} from "react";
import BannerCanvasWrapper from "../Banner/BannerCanvas/BannerCanvasWrapper";
import {mainSidebarWidth, secondSidebarWidth} from "../../../../Utils/CONST";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {getShowSecondSidebar, getSize} from "../../../../Store/selectors/editor-selectors";
import {getRefCanvas, getWrapperPosition, getZoom} from "../../../../Store/selectors/workspace-selectors";
import throttle from "lodash/throttle";
import {workspaceAC} from "../../../../Store/reducers/workspace-reducer";
import {textAC} from "../../../../Store/reducers/text-reducer";
import {
    getCursorOnRotatorPosition, getRotatedText,
    getRotatedTextId
} from "../../../../Store/selectors/text-selectors";

//============ CUSTOM HOOK ====================
const useEditorWorkspace = () => {
    const dispatch = useDispatch();
    const showSecondSidebar = useSelector(getShowSecondSidebar);
    const size = useSelector(getSize);
    const zoom = useSelector(getZoom);
    const z = zoom / 100;
    const refCanvas = useSelector(getRefCanvas);

    // корректировка wrapperPosition при прокрутке
    const onScrollHandler = () => {
        console.log('onScrollHandler')
        if (refCanvas && refCanvas.current) {
            // @ts-ignore
            const wrapper: DOMRect = refCanvas.current.getBoundingClientRect();
            const x = wrapper.left;
            const y = wrapper.top;
            dispatch(workspaceAC.setWrapperPosition(x, y));
        }
    };
    const onScrollHandlerThrottle = throttle(onScrollHandler, 1000);

    const rotatedTextId = useSelector(getRotatedTextId);
    const wrapperPosition = useSelector(getWrapperPosition);
    //const sizeOfSelectedText = useSelector(getSizeOfSelectedText);

    const rotatedText = useSelector(getRotatedText);
    const cursorOnRotatorPosition = useSelector(getCursorOnRotatorPosition);

    const [angleStart, setAngleStart] = useState(0); // угол поворота в момент начала вращения
    useEffect(() => {
        if (rotatedTextId) {
            //console.log('Начало вращения')
            setAngleStart(rotatedText.angle); // установка угла поворота в моменте начала вращения
        }
    }, [rotatedTextId]);

    const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (rotatedTextId) { // режим вращения текста
            // 1 - коорд. центра текста отн. окна = коорд. левого верхнего угла канваса отн. окна +
            // коорд. левого верхнего угла текста отн. левого верхнего угла канваса +
            // половина габарита текста
            const xCanvas = wrapperPosition.x; // координаты левого верхнего угла канваса относительно окна
            const yCanvas = wrapperPosition.y;
            const xText = rotatedText.position.left; // коорд. левого верхнего угла текста отн. левого верхнего угла канваса
            const yText = rotatedText.position.top;

            // const xCenter = xCanvas + z * (xText + sizeOfSelectedText.width / 2); // коорд. центра текста отн. окна
            // const yCenter = yCanvas + z * (yText + sizeOfSelectedText.height / 2);
            const xCenter = xCanvas + z * (xText + rotatedText.size.width / 2); // коорд. центра текста отн. окна
            const yCenter = yCanvas + z * (yText + rotatedText.size.height / 2);


            const xStart = cursorOnRotatorPosition.x; // начальное положение курсора относительно окна
            const yStart = cursorOnRotatorPosition.y;

            const xCursor = e.clientX; // текущее (конечное) положение курсора относительно окна
            const yCursor = e.clientY;

            const Vector_start = { // вектор начального положения (от центра текста до начального положения курсора)
                x: xStart - xCenter,
                y: yStart - yCenter
            };
            const Vector_end = { // вектор текущего (конечного) положения
                x: xCursor - xCenter,
                y: yCursor - yCenter
            };
            // (Vector_start, Vector_end) = Vector_start.x * Vector_end.x + Vector_start.y * Vector_end.y
            // (Vector_start, Vector_end) = Vector_start_mod * Vector_end_mod * cos(angle)

            // модули векторов
            const Vector_start_mod = Math.sqrt(Vector_start.x * Vector_start.x + Vector_start.y * Vector_start.y);
            const Vector_end_mod = Math.sqrt(Vector_end.x * Vector_end.x + Vector_end.y * Vector_end.y);

            // скалярное произведение векторов
            const mult = Vector_start.x * Vector_end.x + Vector_start.y * Vector_end.y;
            const cos = mult / (Vector_start_mod * Vector_end_mod);
            let angle = (180 / Math.PI) * Math.acos(cos);


            // третья координата векторного произведения - ее знак определяет направление вращения
            const multVector = Vector_start.x * Vector_end.y - Vector_start.y * Vector_end.x;
            const direction = multVector >= 0 ? 1 : -1; // знак направление вращения

            // xCenter, yCenter - коорд. центра текста отн. окна
            // xCursor, xCursor - текущее (конечное) положение курсора относительно окна
            // if (xCursor <= xCenter) {
            //     angle = 360 - angle;
            // }
            console.log(angleStart + direction * angle);
            dispatch(textAC.setAngle(rotatedTextId, angleStart + direction * angle))

        }

    };
    const onMouseMoveThrottle = throttle(onMouseMoveHandler, 1500);

    return {
        size, zoom, showSecondSidebar, onScrollHandlerThrottle,
        onMouseMoveThrottle
    }
};

const Row1 = styled.div`
    display: flex;
    min-height: 50px;
    flex-shrink: 0;
    flex-grow: 1; 
`;

const Div1 = styled.div`
    min-width: 50px;
    min-height: 50px;
    box-sizing: border-box;    
    flex-shrink: 0;
    flex-grow: 1;
`;

const Div2 = styled.div`
    width: ${(props: { width: number, zoom: number }) => `${props.width * props.zoom / 100}px`};
    min-height: 50px;
    box-sizing: border-box;    
    flex-shrink: 0;
`;

const Row2 = styled.div`
    display: flex;    
    flex-shrink: 0; 
`;

const Div3 = styled.div`
    height: ${(props: { height: number, zoom: number }) => `${props.height * props.zoom / 100}px`};
    min-width: 50px;
    box-sizing: border-box;
    //border: 5px solid red;
    flex-shrink: 0;
    flex-grow: 1;
`;

const WorkspaceDiv = styled.div`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        width: ${
    (
        props: { showSecondSidebar: boolean }
    ) => `calc(100vw - ${mainSidebarWidth}px - ${secondSidebarWidth * (props.showSecondSidebar ? 1 : 0)}px)`
};
        box-sizing: border-box;
        overflow: auto;
`

//============== COMPONENT =================
const Workspace: React.FC<{}> = () => {
    const {
        size, zoom, showSecondSidebar, onScrollHandlerThrottle,
        onMouseMoveThrottle
    } = useEditorWorkspace();

    return (
        <WorkspaceDiv showSecondSidebar={showSecondSidebar}
                      onScroll={onScrollHandlerThrottle}
                      onMouseMove={onMouseMoveThrottle}
        >
            <Row1>
                <Div1/>
                <Div2 width={size.width as number} zoom={zoom}/>
                <Div1/>
            </Row1>
            <Row2>
                <Div3 height={size.height as number} zoom={zoom}/>
                <BannerCanvasWrapper/>
                <Div3 height={size.height as number} zoom={zoom}/>
            </Row2>
            <Row1>
                <Div1/>
                <Div2 width={size.width as number} zoom={zoom}/>
                <Div1/>
            </Row1>


        </WorkspaceDiv>
    )
};

export default Workspace;