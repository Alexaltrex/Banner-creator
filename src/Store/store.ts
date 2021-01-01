import {Action, applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import { reducer as formReducer } from 'redux-form';
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./reducers/app-reducer";
import editorReducer from "./reducers/editor-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import workspaceReducer from "./reducers/workspace-reducer";
import textReducer from "./reducers/text-reducer";

let rootReducer = combineReducers({
    app: appReducer,
    editor: editorReducer,
    workspace: workspaceReducer,
    text: textReducer,
    form: formReducer
});

const middleware: Array<Middleware> = [thunkMiddleware];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
export default store;

//======================== TYPE ==========================
export type StateType = ReturnType<typeof rootReducer>
export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>