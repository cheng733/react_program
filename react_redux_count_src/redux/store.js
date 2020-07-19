import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Count from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
export default createStore(Count, composeWithDevTools(applyMiddleware(thunk)))

