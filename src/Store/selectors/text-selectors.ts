import {StateType} from "../store";

export const getTexts = (state: StateType) => state.text.texts;
export const getSelectedTextId = (state: StateType) => state.text.selectedTextId;
export const getShowAlarm = (state: StateType) => state.text.showAlarm;

