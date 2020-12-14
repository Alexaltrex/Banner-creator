import {BaseThunkType, GetActionsType} from "../store";
import {
    BackgroundStyleColorType,
    BackgroundStyleType, GradientStyleType,
    MainSidebarItemEnum, ScaleModeType,
    BackgroundTabIndexEnum,
    SizeType,
    AlignType, ImageTabIndexEnum, ImageType, ImageItemType
} from "../../Types/types";
import {AppActionsType} from "./app-reducer";
import {WorkspaceActionsType} from "./workspace-reducer";

const initialState = {
    size: { // размер баннера
        width: null as null | number,
        height: null as null | number,
    },
    mainSidebarItem: 0 as MainSidebarItemEnum, // пункт главной боковой панели
    showSecondSidebar: true, // показать или скрыть вспомогательную боковую панель
    secondarySidebarBackgroundTabIndex: 0 as BackgroundTabIndexEnum, // индекс активной вкладки на вспомогательной боковой панели 'Background'
    backgroundStyle: 'color' as BackgroundStyleType,
    useBorder: false, // есть ли рамка
    borderColor: '#000', // цвет рамки
    backgroundStyleColor: { // параметры монохромного заднего фона
        color: '#fff'
    } as BackgroundStyleColorType,
    backgroundStyleGradient: { // параметры градиентного заднего фона
        gradientStyle: 'horizontal' as GradientStyleType,
        colorStart: '#000',
        colorEnd: '#FFF'
    },
    backgroundStyleImage: {
        images: [] as Array<ImageType>,
        currentImage: null as null | ImageType,
        scaleMode: 'Maintain aspect' as ScaleModeType,
        align: 'center' as AlignType
    },
    imageTabIndex: 0 as ImageTabIndexEnum,
    canvasUrl: { // урлы отрисованных канвасов для экспорта
        background: null as null | string,
        border: null as null | string,
        text: null as null | string,
    },
    isLoading: false
};
//=================== REDUCER ===========================
const editorReducer = (state = initialState, action: EditorActionsType): InitialStateType => {
        switch (action.type) {
            case 'EDITOR/SET_SIZE': {
                return {...state, size: action.size}
            }
            case 'EDITOR/SET_MAIN_SIDEBAR_ITEM': {
                return {...state, mainSidebarItem: action.mainSidebarItem}
            }
            case 'EDITOR/SET_SHOW_SECOND_SIDEBAR': {
                return {...state, showSecondSidebar: action.showSecondSidebar}
            }
            case 'EDITOR/SET_SECONDARY_SIDEBAR_BACKGROUND_TAB_INDEX': {
                return {...state, secondarySidebarBackgroundTabIndex: action.secondarySidebarBackgroundTabIndex}
            }
            case 'EDITOR/SET_BACKGROUND_STYLE': {
                return {...state, backgroundStyle: action.backgroundStyle}
            }
            case 'EDITOR/SET_BACKGROUND_STYLE_COLOR': {
                return {...state, backgroundStyleColor: action.backgroundStyleColor}
            }
            case 'EDITOR/SET_USE_BORDER': {
                return {...state, useBorder: action.useBorder}
            }
            case 'EDITOR/SET_BORDER_COLOR': {
                return {...state, borderColor: action.borderColor}
            }
            case 'EDITOR/SET_GRADIENT_STYLE': {
                return {
                    ...state,
                    backgroundStyleGradient: {
                        ...state.backgroundStyleGradient,
                        gradientStyle: action.gradientStyle
                    }
                }
            }
            case 'EDITOR/SET_COLOR_START': {
                return {
                    ...state,
                    backgroundStyleGradient: {
                        ...state.backgroundStyleGradient,
                        colorStart: action.colorStart
                    }
                }
            }
            case 'EDITOR/SET_COLOR_END': {
                return {
                    ...state,
                    backgroundStyleGradient: {
                        ...state.backgroundStyleGradient,
                        colorEnd: action.colorEnd
                    }
                }
            }
            case 'EDITOR/SET_REPLACE_COLOR': {
                const colorStart = state.backgroundStyleGradient.colorStart;
                const colorEnd = state.backgroundStyleGradient.colorEnd;
                return {
                    ...state,
                    backgroundStyleGradient: {
                        ...state.backgroundStyleGradient,
                        colorEnd: colorStart,
                        colorStart: colorEnd
                    }
                }
            }
            case 'EDITOR/ADD_IMAGE': { // добавить и установить текущим
                if (state.backgroundStyleImage.images.find(//
                    el => el.name === action.name
                )) {
                    return state
                } else {
                    const length = state.backgroundStyleImage.images.length
                    const id = length === 0 ? 1 : state.backgroundStyleImage.images[length - 1].id + 1;
                    return {
                        ...state,
                        backgroundStyleImage: {
                            ...state.backgroundStyleImage,
                            images: [
                                ...state.backgroundStyleImage.images,
                                {
                                    id: id,
                                    src: action.src,
                                    name: action.name
                                }
                            ],
                            currentImage: {
                                id: id,
                                src: action.src,
                                name: action.name
                            }
                        }
                    }
                }
            }
            case 'EDITOR/ADD_IMAGES': { // добавить и установить последний текущим
                let stateImages = [...state.backgroundStyleImage.images];
                for (let i = 0; i < action.images.length; i++) {
                    if (stateImages.find(// если с таким именем уже есть
                        el => el.name === action.images[i].name
                    )) {
                        //return state
                    } else {// если с таким именем еще нет
                        const id = stateImages.length === 0
                            ? 1
                            : stateImages[stateImages.length - 1].id + 1;
                        stateImages = [
                            ...stateImages,
                            {
                                id: id,
                                src: action.images[i].src,
                                name: action.images[i].name
                            }
                        ];
                    }
                }
                return {
                    ...state,
                    backgroundStyleImage: {
                        ...state.backgroundStyleImage,
                        images: stateImages,
                        currentImage: stateImages[stateImages.length - 1]
                    }
                }
            }
            case
            'EDITOR/SET_CURRENT_IMAGE': {
                const currentImage = state.backgroundStyleImage.images.find(el => el.id === action.id) as ImageType;
                return {
                    ...state,
                    backgroundStyleImage: {
                        ...state.backgroundStyleImage,
                        currentImage: currentImage
                    }
                }
            }
            case 'EDITOR/SET_IMAGE_TAB_INDEX': {
                return {...state, imageTabIndex: action.imageTabIndex}
            }
            case
            'EDITOR/SET_SCALE_MODE': {
                return {
                    ...state,
                    backgroundStyleImage: {
                        ...state.backgroundStyleImage,
                        scaleMode: action.scaleMode
                    }
                }
            }
            case
            'EDITOR/SET_ALIGN': {
                return {
                    ...state,
                    backgroundStyleImage: {
                        ...state.backgroundStyleImage,
                        align: action.align
                    }
                }
            }
            case
            'EDITOR/SET_CANVAS_URL': {
                return {
                    ...state,
                    canvasUrl: {
                        ...state.canvasUrl,
                        [action.layer]: action.url
                    }
                }
            }
            case
            'EDITOR/SET_IS_LOADING': {
                return {...state, isLoading: action.isLoading}
            }
            default:
                return state;
        }
    }
;

//=================== ACTION-CREATORS =====================
export const editorAC = {
    setSize: (size: SizeType) => ({type: 'EDITOR/SET_SIZE', size} as const),
    setMainSidebarItem: (mainSidebarItem: MainSidebarItemEnum) => ({
        type: 'EDITOR/SET_MAIN_SIDEBAR_ITEM',
        mainSidebarItem
    } as const),
    setShowSecondSidebar: (showSecondSidebar: boolean) => ({
        type: 'EDITOR/SET_SHOW_SECOND_SIDEBAR',
        showSecondSidebar
    } as const),
    setSecondarySidebarBackgroundTabIndex: (secondarySidebarBackgroundTabIndex: BackgroundTabIndexEnum) => ({
        type: 'EDITOR/SET_SECONDARY_SIDEBAR_BACKGROUND_TAB_INDEX',
        secondarySidebarBackgroundTabIndex
    } as const),
    setBackgroundStyle: (backgroundStyle: BackgroundStyleType) => ({
        type: 'EDITOR/SET_BACKGROUND_STYLE',
        backgroundStyle
    } as const),
    setBackgroundStyleColor: (backgroundStyleColor: BackgroundStyleColorType) => ({
        type: 'EDITOR/SET_BACKGROUND_STYLE_COLOR',
        backgroundStyleColor
    } as const),
    setUseBorder: (useBorder: boolean) => ({type: 'EDITOR/SET_USE_BORDER', useBorder} as const),
    setBorderColor: (borderColor: string) => ({type: 'EDITOR/SET_BORDER_COLOR', borderColor} as const),
    setGradientStyle: (gradientStyle: GradientStyleType) => ({
        type: 'EDITOR/SET_GRADIENT_STYLE',
        gradientStyle
    } as const),
    setColorStart: (colorStart: string) => ({
        type: 'EDITOR/SET_COLOR_START',
        colorStart
    } as const),
    setColorEnd: (colorEnd: string) => ({
        type: 'EDITOR/SET_COLOR_END',
        colorEnd
    } as const),
    replaceColor: () => ({type: 'EDITOR/SET_REPLACE_COLOR'} as const),
    addImage: (src: string, name: string) => ({type: 'EDITOR/ADD_IMAGE', src, name} as const),
    addImages: (images: Array<ImageItemType>) => ({type: 'EDITOR/ADD_IMAGES', images} as const),
    setImageTabIndex: (imageTabIndex: ImageTabIndexEnum) => ({
        type: 'EDITOR/SET_IMAGE_TAB_INDEX',
        imageTabIndex
    } as const),
    setScaleMode: (scaleMode: ScaleModeType) => ({type: 'EDITOR/SET_SCALE_MODE', scaleMode} as const),
    setAlign: (align: AlignType) => ({type: 'EDITOR/SET_ALIGN', align} as const),
    setCurrentImage: (id: number) => ({type: 'EDITOR/SET_CURRENT_IMAGE', id} as const),
    setCanvasUrl: (layer: 'background' | 'border' | 'text', url: null | string) => ({
        type: 'EDITOR/SET_CANVAS_URL',
        layer,
        url
    } as const),
    setIsLoading: (isLoading: boolean) => ({type: 'EDITOR/SET_IS_LOADING', isLoading} as const),
};
export default editorReducer;

//====================== THUNK-CREATORS =========================
const readUploadedFileAsUrl = (inputFile: File) => {
    const reader = new FileReader();

    return new Promise<null | string | ArrayBuffer>((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(inputFile);
    });
};

// export const loadImage = (file: File): ThunkType => async (dispatch) => {
//     try {
//         const src = await readUploadedFileAsUrl(file);
//         const name = file.name;
//
//         if (typeof src === 'string') {
//             dispatch(editorAC.addImage(src, name));
//             dispatch(editorAC.setBackgroundStyle('image'));
//         }
//
//     } catch (e) {
//         console.log(e.message)
//     }
//
// };

export const loadImages = (files: Array<File>): ThunkType => async (dispatch) => {
    const images = [] as Array<ImageItemType>
    for (let i = 0; i < files.length; i++) {
        try {
            const src = await readUploadedFileAsUrl(files[i]);
            const name = files[i].name;
            if (typeof src === 'string') {
                //dispatch(editorAC.addImage(src, name));
                images.push({src, name})
                dispatch(editorAC.setBackgroundStyle('image'));
            }
        } catch (e) {
            console.log(e.message)
        }
    }
    dispatch(editorAC.addImages(images));

};

//============== TYPE ==================
export type InitialStateType = typeof initialState;
export type EditorActionsType = GetActionsType<typeof editorAC>;
type ThunkType = BaseThunkType<EditorActionsType | AppActionsType | WorkspaceActionsType>