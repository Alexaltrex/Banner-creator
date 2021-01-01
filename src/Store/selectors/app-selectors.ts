import {StateType} from "../store";

export const getLang = (state: StateType) => state.app.lang;
export const getIsCreated = (state: StateType) => state.app.isCreated;

