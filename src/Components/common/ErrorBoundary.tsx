import React from 'react';
import {ErrorInfo} from "react";

class ErrorBoundary extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

//==================== TYPES ========================
type PropsType = {};
type StateType = {
    error: null | Error
    errorInfo: null | ErrorInfo
}