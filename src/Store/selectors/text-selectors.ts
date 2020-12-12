import {StateType} from "../store";

export const getTexts = (state: StateType) => state.text.texts;
export const getSelectedTextId = (state: StateType) => state.text.selectedTextId;

