import { take, cancel, call, put, cancelled, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
// import api from '../../common/api/module';

import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../modules/login/constants';

import { setClient, unsetClient } from '../modules/user/actions';
import { setIdleTimeFlag } from '../modules/idleTime/actions';

import { CLIENT_UNSET } from '../modules/user/constants';

function loginApi(email, password, deviceId) {
    const params = { email, password, deviceId };

    let data;
    if(email === 'kavishn8387@gmail.com' && password === 'Test@1234') {
        data = { token: true, email: 'kavishn8387@gmail.com' };
        return data;
    } else {
        data = { token: false };
        return data;
    }
}

function* logout() {
    yield put(unsetClient());

    localStorage.removeItem('token');

    yield put(push('/'));
}

function* loginFlow(loginParams) {
    let token;
    try {
        const { email, password, deviceId } = loginParams;
        token = yield call(loginApi, email, password, deviceId);
        console.log('token', token)
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('email', JSON.stringify(token.email));
        yield put(setClient({
            token: token.token,
            // userId: token.data.user.id,
            // isDeviceRegistered: token.data.isDeviceRegistered,
            // active: token.data.user.active,
            // isBlocked: token.data.user.isBlocked,
            email: token.email
        }));

        // yield put(setIdleTimeFlag({
        //     time: false,
        //     email: token.data.email
        // }));

        yield put({ type: LOGIN_SUCCESS });

        if (token.token) {
            console.log('sdsssss')
            yield put(push('/dashboard'));
        } else {
            yield put(push('/'));
        }
    } catch (error) {
        let __error = error;
        if (typeof error === 'object' && !error.hasOwnProperty('error')) {
            console.error('ERROR IN LOGIN SAGA CALL', __error);
            __error = {
                error: {
                    message: 'NETWORK ERROR OR CORS ERROR',
                    details: []
                }
            };
        }
        yield put({ type: LOGIN_ERROR, error: __error });
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login
        if (yield cancelled()) {
            yield put(push('/otp'));
        }
    }
    return token;
}

function* loginWatcher() {
    while (true) {
        const task = yield takeLatest(LOGIN_REQUESTING, loginFlow);
        console.log('test', task)
        // const task = yield fork(loginFlow, email, password, deviceId);

        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

        if (action.type === CLIENT_UNSET) yield cancel(task);

        yield call(logout);

        yield cancel(task);
    }
}

export default loginWatcher;
