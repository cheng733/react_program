import React from 'react'
import ReactDOM from 'react-dom'
import App from "./containers/app";
import store from './redux/store'
import {Provider}from './react-reudx'

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
),document.getElementById('root'))


