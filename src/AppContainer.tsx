import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import React, {ReactElement} from "react";
import App from "./App";
import store from "./Store/store";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import {CssBaseline} from "@material-ui/core";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const AppContainer: React.FC = (): ReactElement => {
    return (
        <HashRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <CssBaseline/>
                    <DndProvider backend={HTML5Backend}>
                        <App/>
                    </DndProvider>
                </ErrorBoundary>
            </Provider>
        </HashRouter>
    )
}

export default AppContainer;