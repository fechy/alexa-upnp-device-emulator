import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

const socket = io();

import './style.css';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            state: false
        };

        this._handleRequest     = this._handleRequest.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);

        socket.on('request-service', (newCallState) => this._handleRequest(newCallState));
        socket.on('request-setup',   (newCallState) => this._handleRequest(newCallState));
        socket.on('request-action',  (newCallState) => this._handleStateChange(newCallState));
    }

    _handleRequest(value) {
        console.log(value);
    }

    _handleStateChange(value) {
        if (value.action === 'SetBinaryState' || value.action === 'GetBinaryState') {
            this.setState({ state: value.result == 1 ? true : false });
        }
    }

    render() {
        const status = this.state.state ? "on" : "off";
        return (
            <div>
                <div className="container">
                    <div className="item">
                        <h1>SWITCH ME {this.state.state ? "OFF" : "ON"}!</h1>
                        <div className={classnames("status", status)}>
                            {status}
                        </div>
                        <h4>Go to your Alexa app and switch</h4>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));  