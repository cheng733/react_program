import {combineReducers} from "../MyRedux/redux";

function count(state=1,action) {
    console.log('count',state,action)
    switch (action.type) {
        case 'INCREMENT':
            return state+action.count

        case 'DECREMENT':
            return state-action.count

        default:
            return state
    }
}
function user(state={},action) {
    console.log('user',state,action)
    switch (action.type) {
        default:
            return state
    }
}
export default combineReducers({count,user})