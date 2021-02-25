import {DownloadCaseType, ZoomType} from "../../Types/types";
import {GetActionsType} from "../store";

const initialState = {
    zoom: 100 as ZoomType, // масштаб рабочей области
    downloadCase: 'PNG' as DownloadCaseType, // сохранить как
    jpegQuality: 0.8, // качество jpeg изображения
    refLeftPanel: null as null | React.MutableRefObject<null>, // ссылка на контекстную панель
    refToolbar: null as null | React.MutableRefObject<null>, // ссылка на верхнюю панель инструментов
    refCanvas: null as null | React.MutableRefObject<null>, // ссылка на канвас заднего фона
    wrapperPosition: { // координаты левого верхнего угла канваса
        x: 0,
        y: 0
    },
    isDownloadDialogOpen: false, // открыто или закрыто диалоговое окно сохранения баннера
    fileName: 'my-banner',
    fileNameFormIsValid: true,
    link: 'test.com',
    linkFormIsValid: true,
};

//=================== REDUCER ===========================
const workspaceReducer = (state = initialState, action: WorkspaceActionsType): InitialStateType => {
    switch (action.type) {
        case 'BANNER_CREATOR/WORKSPACE/SET_ZOOM': {
            return {...state, zoom: action.zoom}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_REF_LEFT_PANEL': {
            return {...state, refLeftPanel: action.refLeftPanel}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_REF_TOOLBAR': {
            return {...state, refToolbar: action.refToolbar}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_REF_CANVAS': {
            return {...state, refCanvas: action.refCanvas}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_DOWNLOAD_CASE': {
            return {...state, downloadCase: action.downloadCase}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_IS_DOWNLOAD_DIALOG_OPEN': {
            return {...state, isDownloadDialogOpen: action.isDownloadDialogOpen}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_FILE_NAME': {
            return {...state, fileName: action.fileName}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_LINK': {
            return {...state, link: action.link}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_FILE_NAME_FORM_IS_VALID': {
            return {...state, fileNameFormIsValid: action.fileNameFormIsValid}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_LINK_FORM_IS_VALID': {
            return {...state, linkFormIsValid: action.linkFormIsValid}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_JPEG_QUALITY': {
            return {...state, jpegQuality: action.jpegQuality}
        }
        case 'BANNER_CREATOR/WORKSPACE/SET_WRAPPER_POSITION': {
            return {...state, wrapperPosition: {x: action.x, y: action.y}}
        }
        default:
            return state;
    }
};
export default workspaceReducer;

//=================== ACTION-CREATORS =====================
export const workspaceAC = {
    setZoom: (zoom: ZoomType) => ({type: 'BANNER_CREATOR/WORKSPACE/SET_ZOOM', zoom} as const),
    setRefLeftPanel: (refLeftPanel: null | React.MutableRefObject<null>) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_REF_LEFT_PANEL',
        refLeftPanel
    } as const),
    setRefToolbar: (refToolbar: null | React.MutableRefObject<null>) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_REF_TOOLBAR',
        refToolbar
    } as const),
    setRefCanvas: (refCanvas: null | React.MutableRefObject<null>) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_REF_CANVAS',
        refCanvas
    } as const),
    setDownloadCase: (downloadCase: DownloadCaseType) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_DOWNLOAD_CASE',
        downloadCase
    } as const),
    setIsDownloadDialogOpen: (isDownloadDialogOpen: boolean) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_IS_DOWNLOAD_DIALOG_OPEN',
        isDownloadDialogOpen
    } as const),
    setFileName: (fileName: string) => ({type: 'BANNER_CREATOR/WORKSPACE/SET_FILE_NAME', fileName} as const),
    setFileNameFormIsValid: (fileNameFormIsValid: boolean) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_FILE_NAME_FORM_IS_VALID',
        fileNameFormIsValid
    } as const),
    setJpegQuality: (jpegQuality: number) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_JPEG_QUALITY',
        jpegQuality
    } as const),
    setLink: (link: string) => ({type: 'BANNER_CREATOR/WORKSPACE/SET_LINK', link} as const),
    setLinkFormIsValid: (linkFormIsValid: boolean) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_LINK_FORM_IS_VALID',
        linkFormIsValid
    } as const),
    setWrapperPosition: (x: number, y: number) => ({
        type: 'BANNER_CREATOR/WORKSPACE/SET_WRAPPER_POSITION',
        x, y
    } as const),
};

//============== TYPE ==================
export type InitialStateType = typeof initialState;
export type WorkspaceActionsType = GetActionsType<typeof workspaceAC>;