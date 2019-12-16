import { take, fork, call, put, cancelled } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Axios from 'axios';
import {
    FORECAST_REQUESTING,
    FORECAST_ERROR,
} from '../modules/forecast/constants';

import { setForecastList } from '../modules/forecast/action';
import { unsetClient } from '../modules/user/actions';


function forecastApi(statusList) {
    return Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${statusList.city},${statusList.country}&appid=${statusList.Api_Key}&mode=json&cnt=40`);
}


function* forecastFlow(statusList) {
    let data;
    try {
        data = yield call(forecastApi, statusList);
        yield put(setForecastList(data));
    } catch (error) {
        if (error.response.status === 401) {
            yield put(unsetClient());
            yield put(push('/'));
        }
        yield put({ type: FORECAST_ERROR, error });
    } finally {
        if (yield cancelled()) {
            yield put(push('/'));        }
    }

    return data;
}

function* forecastWatcher() {
    while (true) {
        const { city, country, Api_Key } = yield take(FORECAST_REQUESTING);
        const data = {
            city,
            country,
            Api_Key
        }
        yield fork(forecastFlow, data);
    }
}

export default forecastWatcher;
