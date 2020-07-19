import React,{Component} from 'react'



export default  class Count extends Component {
    constructor(props){
        super(props)
        this.myRef  = React.createRef()
    }

    increment = ()=>{

        this.props.increment()
    }
    decrement = ()=>{

        this.props.decrement()
    }
    addIFODD = ()=>{

            if(this.myRef.current.innerHTML%2===1){
                this.props.increment()
            }
    }
    addAsync = ()=>{

        this.props.incrementAsync()
    }
    render() {
        const count = this.props.count
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