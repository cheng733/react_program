import React,{Component} from 'react'

export default  class App extends Component {
    state = {
        count:0
    }
    incrementCount = () =>{
        this.setState((state)=>({
           count:state.count+1
        }))
    }
    decrementCount = () =>{
        this.setState((state)=>({
            count:state.count-1
        }))
    }
    increseIFOdd = () =>{
        if(this.state.count%2===1){
            this.setState((state)=>({
                count:state.count+1
            }))
        }
    }
    increseAysnc = () =>{
        setTimeout(
            ()=>{
                this.setState((state)=>({
                    count:state.count+1
                }))
            },1000
        )
    }
    render() {
        const {count} = this.state
        return(
            <div>
                <h2>累加{count}次数</h2>
                <button onClick={this.incrementCount}>+</button>
                <button onClick={this.decrementCount}>-</button>
                <button onClick={this.increseIFOdd}>ADDIFODD</button>
                <button onClick={this.increseAysnc}>ADDSYNC</button>
            </div>


        )
    }
}