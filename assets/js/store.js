import { createStore, applyMiddleware } from 'redux';
import baseThunkMiddleware from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers/Index';

const thunk = baseThunkMiddleware.withExtraArgument({ axios });
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
