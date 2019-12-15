import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sagas from './sagas';
import rootReducer from './rootReducers';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
    return typeof window === 'object'
    // return typeof window === 'object' && __CONFIG__.basename
  && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f;
};

export default function configureStore(initialState, history) {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

    const composedStoreEnhancer = compose(middleware, reduxDevTool());

    const store = composedStoreEnhancer(createStore)(persistedReducer, initialState);

    const persistor = persistStore(store);

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./rootReducers', () => {
            store.replaceReducer(require('./rootReducers'));
        });
    }

    return { store, persistor };
}
