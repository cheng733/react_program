/*
 reducer:createState、applyMiddleware、combineReducers
 createState传入reducer函数，输出一个store对象
 store对象管理state和reducer，有三个方法：getState、dispatch、subscribe
 getState函数返回一个state对象，dispatch传入action对象，调用reducer函数产生一个新的state对象，出发监听器subscribe调用然后界面更新
 */ 
export function createStore(reducers) {
    let state = reducers(undefined,'@121212')
    const subscribes = []
    function getState() {
        return state
    }
    function dispatch(action) {
       let newState =  reducers(state,action)
        state = newState
        subscribes.map(subscribe => subscribe())
    }
    function subscribe(listener) {
        subscribes.push(listener)
    }
    return {getState,dispatch,subscribe}  /*返回一个store对象*/
}

export function combineReducers(reducers) {
    let totalState = {}
    return (state={},action) =>{
        Object.keys(reducers).forEach(key =>{
        totalState[key] = reducers[key](state[key],action)
    })
            return totalState
    }
}