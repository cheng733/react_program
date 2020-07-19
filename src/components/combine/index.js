import React from 'react'
import {Route,Switch}from 'react-router-dom'

import JSCode from "../../pages/JS_code/JS_code";
import ReactCode from "../../pages/react_code/react_code";
import VueCode from "../../pages/vue_code/vue_code";

export default  class Index extends React.Component{
    render() {
        return (
            <Switch>
                <Route path='/blog/js' component={JSCode}/>
                <Route path='/blog/react' component={ReactCode}/>
                <Route path='/blog/vue' component={VueCode}/>
            </Switch>
        )
    }
}