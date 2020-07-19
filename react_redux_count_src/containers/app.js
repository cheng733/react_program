import React from 'react'
import {connect} from '../react-reudx'

import Count from '../components/count'
import {increment,decrement,incrementAsync} from '../redux/action'
const mapStateToProps = (state)=>({
    count:state
})
const mapDispathToProps = (dispatch)=>({
    increment: () =>dispatch(increment()),
    decrement: () =>dispatch(decrement()),
    incrementAsync: () =>dispatch(incrementAsync())
})
export default connect(
    mapStateToProps,
    mapDispathToProps
)(Count)