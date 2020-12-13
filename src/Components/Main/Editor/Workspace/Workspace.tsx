import React from "react";
import {makeStyles} from "@material-ui/core";
import BannerCanvasWrapper from "../Banner/BannerCanvas/BannerCanvasWrapper";
import {mainSidebarWidth, secondSidebarWidth} from "../../../../Utils/CONST";
import LeftPanel from "./LeftPanel/LeftPanel";
import {useSelector} from "react-redux";
import {getTexts} from "../../../../Store/selectors/text-selectors";
import styled from "styled-components";
import {getShowSecondSidebar, getSize} from "../../../../Store/selectors/editor-selectors";
import {getZoom} from "../../../../Store/selectors/workspace-selectors";

//============ CUSTOM HOOK ====================
const useEditorWorkspace = () => {
    const texts = useSelector(getTexts);
    const leftPanelIsShow = !!texts.find(el => el.editParameters === true);
    const showSecondSidebar = useSelector(getShowSecondSidebar);
    const size = useSelector(getSize);
    const zoom = useSelector(getZoom);
    return {
        leftPanelIsShow, size, zoom,
        showSecondSidebar
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
    //border: 5px solid red;
    flex-shrink: 0;
    flex-grow: 1;
`;

const Div2 = styled.div`
    width: ${(props: { width: number, zoom: number }) => `${props.width * props.zoom / 100}px`};
    min-height: 50px;
    box-sizing: border-box;
    //border: 5px solid red;
    flex-shrink: 0;
`;

const Row2 = styled.div`
    display: flex;
    //height: 50px;
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
        leftPanelIsShow, size,
        zoom, showSecondSidebar
    } = useEditorWorkspace();

    return (
        <WorkspaceDiv showSecondSidebar={showSecondSidebar}>
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

            {
                leftPanelIsShow &&
                <LeftPanel/>
            }
        </WorkspaceDiv>
    )
};

export default Workspace;