import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { fromJS } from 'immutable';

// import font awesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fas } from '@fortawesome/pro-solid-svg-icons';
// import { fal } from '@fortawesome/pro-light-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { far } from '@fortawesome/pro-regular-svg-icons';

import history from './Common/lib/history';
// import routes from './routes';
import configureStore from './Redux/configureStore';

// import './i18n';

// import font awesome lib functions
// library.add(fas);

let initialState = {};

// rehydrate initialState for JS app
if (window.__INITIAL_STATE__) {
    initialState = window.__INITIAL_STATE__;

    // Transform into Immutable.js collections,
    // but leave top level keys untouched for Redux
    Object
        .keys(initialState)
        .forEach((key) => {
            initialState[key] = fromJS(initialState[key]);
        });
}

const { store, persistor } = configureStore(initialState, history);

store.subscribe(() => {
    store.getState();
});

ReactDOM.render(
<BrowserRouter>
    <App history={history} store={store} persistor={persistor}  />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// ReactDOM.render(
//     <Root history={history} routes={routes} store={store} persistor={persistor} />,
//     document.getElementById('app-container')
// );