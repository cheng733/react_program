import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Detail} from "../detail/detail";
import Addupdate from "../addupdate/addupdate";
import {Product} from "../product/product";

export class Products extends Component{
    render() {
        return (
            <Switch>
                <Route path='/product/detail' component={Detail}/>
                <Route path='/product/addupdate' component={Addupdate}/>
                <Route exact path='/product' component={Product}/>
            </Switch>
        )
    }
}