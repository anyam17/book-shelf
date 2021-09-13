import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Routes from './routes';
import reducers from './reducers';

/* Redux Logger is used to log every action to the browser console. */ 
const logger = createLogger({
    collapsed: true,
});

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk, logger)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root')
);