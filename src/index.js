import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk';

const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('Action:', action)
        const result = next(action)
        console.log('New State:', store.getState())
    console.groupEnd()
    return result
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

ReactDOM.render(
    <BrowserRouter basename='/'>
        <Provider store={store}>
            <App />        
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
