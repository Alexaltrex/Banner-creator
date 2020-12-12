import {GetActionsType} from "../store";
import {LangType} from "../../Types/types";

let initialState = {
    lang: 'eng' as LangType, // язык приложения
    isCreated: false // создан или нет проект
};

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'BANNER_CREATOR/APP/SET_LANG':
            return {...state, lang: action.lang}
        case 'BANNER_CREATOR/APP/SET_IS_CREATED': {
            return {...state, isCreated: action.isCreated}
        }
        default:
            return state;
    }
};

export const appAC = {
    setLang: (lang: LangType) => ({type: 'BANNER_CREATOR/APP/SET_LANG', lang} as const),
    setIsCreated: (isCreated: boolean) => ({type: 'BANNER_CREATOR/APP/SET_IS_CREATED', isCreated} as const),
};

export default appReducer;

//============== TYPE ==================
export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>;