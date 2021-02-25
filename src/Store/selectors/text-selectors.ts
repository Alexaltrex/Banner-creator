import {StateType} from "../store";
import {TextType} from "../../Types/types";
import {createSelector} from "reselect";

export const getTexts = (state: StateType) => state.text.texts;
export const getSelectedTextId = (state: StateType) => state.text.selectedTextId;
export const getMovedTextId = (state: StateType) => state.text.movedTextId;
export const getShowAlarm = (state: StateType) => state.text.showAlarm;
export const getCursorOnTextPosition = (state: StateType) => state.text.cursorOnTextPosition;
export const getRotatedTextId = (state: StateType) => state.text.rotatedTextId;
export const getSizeOfSelectedText = (state: StateType) => state.text.sizeOfSelectedText;
export const getCursorOnRotatorPosition = (state: StateType) => state.text.cursorOnRotatorPosition;
export const getRotatedText = createSelector(
    getRotatedTextId,
    getTexts,
    (rotatedTextId, texts) => texts
        .find(el => el.id === rotatedTextId) as TextType
);
export const getIsAnyTextEditParameters = createSelector(
    getTexts,
    (texts) => !!texts.find(el => el.editParameters === true)
);
export const getSelectedText = createSelector(
    getSelectedTextId,
    getTexts,
    (selectedTextId, texts) => texts
        .find(el => el.id === selectedTextId) as TextType
);






