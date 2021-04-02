import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './reducer'

export default configureStore({
  reducer: chatReducer
})

// export default createStore(chatReducer, composeWithDevTools(applyMiddleware(thunk)));