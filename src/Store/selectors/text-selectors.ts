import {StateType} from "../store";

export const getTexts = (state: StateType) => state.text.texts;
export const getSelectedTextId = (state: StateType) => state.text.selectedTextId;
export const getMovedTextId = (state: StateType) => state.text.movedTextId;
export const getShowAlarm = (state: StateType) => state.text.showAlarm;
export const getCursorOnTextPosition = (state: StateType) => state.text.cursorOnTextPosition;


