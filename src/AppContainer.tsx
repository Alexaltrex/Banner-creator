import {Provider} from "react-redux";
import {HashRouter, Route} from "react-router-dom";
import React, {ReactElement} from "react";
import App from "./App";
import store from "./Store/store";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import {CssBaseline} from "@material-ui/core";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {QueryParamProvider} from "use-query-params";

const AppContainer: React.FC = (): ReactElement => {
    return (
        <HashRouter>
            <Provider store={store}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <ErrorBoundary>
                        <CssBaseline/>
                        <DndProvider backend={HTML5Backend}>
                            <App/>
                        </DndProvider>
                    </ErrorBoundary>
                </QueryParamProvider>
            </Provider>
        </HashRouter>
    )
}

export default AppContainer;