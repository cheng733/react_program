import React,{Component} from 'react'

import {increment,decrement} from './redux/action'

export default  class App extends Component {
    constructor(props){
        super(props)
        this.myRef  = React.createRef()
    }

    increment = ()=>{

        this.props.store.dispatch(increment())
    }
    decrement = ()=>{

        this.props.store.dispatch(decrement())
    }
    addIFODD = ()=>{

            if(this.myRef.current.innerHTML%2===1){
                this.props.store.dispatch(increment())
            }
    }
    addAsync = ()=>{
        setTimeout(()=>{

            this.props.store.dispatch(increment())
        },1000)
    }
    render() {
        const count = this.props.store.getState().count
        return (
            <div>
                <p >累计的次数是<span ref={this.myRef}>{count}</span></p>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.addIFODD}>ADDIFODD</button>
                <button onClick={this.addAsync}>ADDASYNC</button>
            </div>
        )
    }
}