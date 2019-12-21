import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const storeCompose = process.env.ENV === 'dev' ? composeWithDevTools : compose;
export const middlewares = [sagaMiddleware]; // [reduxThunk]
const store = createStore(rootReducer, storeCompose(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

export default store;