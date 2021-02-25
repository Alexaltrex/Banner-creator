import {elementType, TextType} from "../../Types/types";
import {GetActionsType} from "../store";
import {XYCoord} from "react-dnd";


const initialState = {
    texts: [] as Array<TextType>,
    selectedTextId: null as null | number, // id выделенного текста
    movedTextId: null as null | number, // id перетаскиваемого текста
    rotatedTextId: null as null | number, // id вращаемого текста
    showAlarm: false, // показывать сообщение о предельно допустимом количестве строк текста
    // смещение точки клика курсора относительно левого верхнего угла выделенного текста
    // в начале вращения
    cursorOnTextPosition: {
        x: 0,
        y: 0
    },
    cursorOnRotatorPosition: { // положение точки клика курсора относительно окна в начале вращения
        x: 0,
        y: 0
    },
    sizeOfSelectedText: { // размеры выделенного текста
        width: 0,
        height: 0
    }
};

//=================== REDUCER ===========================
const textReducer = (state = initialState, action: textActionsType): InitialStateType => {
    switch (action.type) {
        case 'BANNER_CREATOR/TEXT/ADD_TEXT': {
            if (state.texts.length < 3) {
                const id = state.texts.length ? state.texts[state.texts.length - 1].id + 1 : 1;
                const content = action.element === 'header' ? 'Header' : action.element === 'subheader' ? 'Subheader' : 'Body text';
                const fontSize = action.element === 'header' ? 32 : action.element === 'subheader' ? 24 : 16;
                const top = action.element === 'header' ? 10 : action.element === 'subheader' ? 52 : 86;
                return {
                    ...state,
                    texts: [
                        ...state.texts,
                        {
                            id: id,
                            content: content,
                            position: {
                                top: top,
                                left: 10
                            },
                            fontSize: fontSize,
                            fontStyle: 'normal',
                            fontFamily: 'arial',
                            color: '#000',
                            lowerCase: false,
                            upperCase: false,
                            hover: false,
                            selected: false,
                            editParameters: false,
                            editText: false,
                            angle: 0,
                            size: {
                                width: 0,
                                height: 0
                            }
                        }
                    ]
                }
            } else {
                return {...state, showAlarm: true}
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_HOVER': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, hover: action.hover}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_SELECTED': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, selected: action.selected}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_EDIT_PARAMETERS': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, editParameters: action.editParameters}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_EDIT_TEXT': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, editText: action.editText}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_FONT_SIZE': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, fontSize: action.fontSize}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_FONT_STYLE': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, fontStyle: action.fontStyle}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_POSITION': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {
                        ...el, position: {
                            top: action.y,
                            left: action.x
                        }
                    }
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_COLOR': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, color: action.color}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_ANGLE': {

            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, angle: action.angle}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_LOWER_CASE': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, lowerCase: action.lowerCase}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_UPPER_CASE': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, upperCase: action.upperCase}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_CONTENT': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {...el, content: action.content}
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_SIZE': {
            return {
                ...state,
                texts: state.texts.map(
                    el => el.id !== action.id ? el : {
                        ...el, size: {
                            width: action.width,
                            height: action.height
                        }
                    }
                )
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_SELECTED_TEXT_ID': {
            return {
                ...state, selectedTextId: action.selectedTextId
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_MOVED_TEXT_ID': {
            return {
                ...state, movedTextId: action.movedTextId
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_ROTATED_TEXT_ID': {
            return {
                ...state, rotatedTextId: action.rotatedTextId
            }
        }
        case 'BANNER_CREATOR/TEXT/REMOVE_TEXT': {
            return {
                ...state,
                texts: state.texts.filter(el => el.id !== action.id)
            }
        }
        case 'BANNER_CREATOR/TEXT/REMOVE_TEXT_ALL': {
            return {
                ...state, texts: []
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_SHOW_ALARM': {
            return {...state, showAlarm: action.showAlarm}
        }
        case 'BANNER_CREATOR/TEXT/SET_CURSOR_ON_TEXT_POSITION': {
            return {
                ...state,
                cursorOnTextPosition: {
                    x: action.x,
                    y: action.y
                }
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_SIZE_OF_SELECTED_TEXT': {
            return {
                ...state, sizeOfSelectedText: {
                    width: action.width,
                    height: action.height
                }
            }
        }
        case 'BANNER_CREATOR/TEXT/SET_CURSOR_ON_ROTATOR_POSITION': {
            return {...state, cursorOnRotatorPosition: {x: action.x, y: action.y}}
        }
        default:
            return state;
    }
};
export default textReducer;

//=================== ACTION-CREATORS =====================
export const textAC = {
    addText: (element: elementType) => ({type: 'BANNER_CREATOR/TEXT/ADD_TEXT', element} as const),
    removeText: (id: number) => ({type: 'BANNER_CREATOR/TEXT/REMOVE_TEXT', id} as const),
    removeTextAll: () => ({type: 'BANNER_CREATOR/TEXT/REMOVE_TEXT_ALL'} as const),
    setHover: (id: number, hover: boolean) => ({type: 'BANNER_CREATOR/TEXT/SET_HOVER', id, hover} as const),
    setSelected: (id: number, selected: boolean) => ({type: 'BANNER_CREATOR/TEXT/SET_SELECTED', id, selected} as const),
    setFontSize: (id: number, fontSize: number) => ({type: 'BANNER_CREATOR/TEXT/SET_FONT_SIZE', id, fontSize} as const),
    setAngle: (id: number, angle: number) => ({type: 'BANNER_CREATOR/TEXT/SET_ANGLE', id, angle} as const),
    setFontStyle: (id: number, fontStyle: 'normal' | 'italic') => ({
        type: 'BANNER_CREATOR/TEXT/SET_FONT_STYLE',
        id,
        fontStyle
    } as const),
    setLowerCase: (id: number, lowerCase: boolean) => ({
        type: 'BANNER_CREATOR/TEXT/SET_LOWER_CASE',
        id,
        lowerCase
    } as const),
    setUpperCase: (id: number, upperCase: boolean) => ({
        type: 'BANNER_CREATOR/TEXT/SET_UPPER_CASE',
        id,
        upperCase
    } as const),
    setPosition: (id: number, x: number, y: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_POSITION',
        id,
        x,
        y
    } as const),
    setColor: (id: number, color: string) => ({type: 'BANNER_CREATOR/TEXT/SET_COLOR', id, color} as const),
    setContent: (id: number, content: string) => ({type: 'BANNER_CREATOR/TEXT/SET_CONTENT', id, content} as const),
    setSize: (id: number, width: number, height: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_SIZE',
        id,
        width,
        height
    } as const),
    setEditParameters: (id: number, editParameters: boolean) => ({
        type: 'BANNER_CREATOR/TEXT/SET_EDIT_PARAMETERS',
        id,
        editParameters
    } as const),
    setEditText: (id: number, editText: boolean) => ({
        type: 'BANNER_CREATOR/TEXT/SET_EDIT_TEXT',
        id,
        editText
    } as const),
    setSelectedTextId: (selectedTextId: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_SELECTED_TEXT_ID',
        selectedTextId
    } as const),
    setRotatedTextId: (rotatedTextId: number | null) => ({
        type: 'BANNER_CREATOR/TEXT/SET_ROTATED_TEXT_ID',
        rotatedTextId
    } as const),
    setMovedTextId: (movedTextId: number | null) => ({
        type: 'BANNER_CREATOR/TEXT/SET_MOVED_TEXT_ID',
        movedTextId
    } as const),
    setShowAlarm: (showAlarm: boolean) => ({type: 'BANNER_CREATOR/TEXT/SET_SHOW_ALARM', showAlarm} as const),
    setCursorOnTextPosition: (x: number, y: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_CURSOR_ON_TEXT_POSITION',
        x, y
    } as const),
    setSizeOfSelectedText: (width: number, height: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_SIZE_OF_SELECTED_TEXT',
        width,
        height
    } as const),
    setCursorOnRotatorPosition: (x: number, y: number) => ({
        type: 'BANNER_CREATOR/TEXT/SET_CURSOR_ON_ROTATOR_POSITION',
        x, y
    } as const)
};

//============== TYPE ==================
export type InitialStateType = typeof initialState;
export type textActionsType = GetActionsType<typeof textAC>;