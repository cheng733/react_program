/*
react-redux:
Provider组件接收store属性，把store传给容器组件；
Provider组件降低react与redux的耦合度，简化redux的编码。
connect函数是把ui组件转换为容器组件的高阶函数，传入mapStateToProps和mapDispatchToProps这两个参数，返回一个高阶函数，高阶函数接收一个ui组件返回一个容器组件；
mapStateToProps以函数的形式向ui组件传递一般的属性，也就是状态数据；
mapDispatchToProps以函数的形式或者是对象的形式向ui组件传递函数属性
*/

import React,{Component} from 'react'
import PropTypes from 'prop-types'
export class Provider extends Component{
    constructor(props){
        super(props)
    }
    static childContextTypes = {
        store:PropTypes.object.isRequired
    }
    getChildContext(){
        return {store:this.props.store}
    }
    render() {
        return (
           this.props.children
        )
    }
}
/*
mapStateToProps = (state) => {count:state.count}
mapDispatchToProps = (dispatch) =>({
increment: number => dispatch(increment(number))
decrement:number => dispatch(decrement(number))
})
或者：
mapDispatchToProps = () =>({
increment,
decrement
})
connect(mapStateToProps,mapDispatchToProps){
mapStateToProps,
mapDispatchToProps
}
*/
export function connect(mapStateToProps,mapDispatchToProps) {
    return function (UIComponent) {
        return class RQComponent extends Component{

            static contextTypes = {
                store:PropTypes.object.isRequired
            }
            state = {
              data:this.context.store.getState()
            }
            render() {
                const store = this.context.store
                store.subscribe(()=>{this.setState({data:store.getState()})})
                 const state = this.state.data
                let mapStateToProp = mapStateToProps(state)
                let mapDispatchToProp ={}
                if(typeof mapDispatchToProps === 'function'){
                    mapDispatchToProp = mapDispatchToProps(store.dispatch)
                }else {
                    Object.keys(mapDispatchToProps()).forEach(key =>{
                       mapDispatchToProp[key] =(...args) =>{store.dispatch( mapDispatchToProps()[key](...args))}
                    })
                }
                return <UIComponent {...mapDispatchToProp}{...mapStateToProp}/>
            }
        }
    }
}