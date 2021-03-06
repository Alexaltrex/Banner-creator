import {StateType} from "../store";

export const getZoom = (state: StateType) => state.workspace.zoom;
export const getDownloadCase = (state: StateType) => state.workspace.downloadCase;
export const getRefLeftPanel = (state: StateType) => state.workspace.refLeftPanel;
export const getRefToolbar = (state: StateType) => state.workspace.refToolbar;
export const getRefCanvas = (state: StateType) => state.workspace.refCanvas;
export const getIsDownloadDialogOpen = (state: StateType) => state.workspace.isDownloadDialogOpen;
export const getFileName = (state: StateType) => state.workspace.fileName;
export const getFileNameFormIsValid = (state: StateType) => state.workspace.fileNameFormIsValid;
export const getJpegQuality = (state: StateType) => state.workspace.jpegQuality;
export const getLink = (state: StateType) => state.workspace.link;
export const getLinkFormIsValid = (state: StateType) => state.workspace.linkFormIsValid;
export const getWrapperPosition = (state: StateType) => state.workspace.wrapperPosition;



