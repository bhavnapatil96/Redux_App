import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app.js'
import {empList} from "./actions/index";
import EmpList from './containers/emp-list.js'

import allReducers from './reducers/index.js'
import thunk from 'redux-thunk'
const store=createStore(allReducers,composeWithDevTools(),applyMiddleware(thunk));
//store.dispatch(empList());
ReactDOM.render(
    <Provider store={store}>
        <EmpList method={store}/>
    </Provider>
    ,document.getElementById('root'));
