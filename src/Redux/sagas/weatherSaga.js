import { take, fork, call, put, cancelled } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Axios from 'axios';
import {
    WEATHER_REQUESTING,
    WEATHER_ERROR,
} from '../modules/weather/constants';

import { setWeatherList } from '../modules/weather/action';
import { unsetClient } from '../modules/user/actions';


function weatherApi(statusList) {
    return Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${statusList.city},${statusList.country}&appid=${statusList.Api_Key}`);
}


function* weatherFlow(statusList) {
    let data;
    try {
        data = yield call(weatherApi, statusList);
        yield put(setWeatherList(data));
    } catch (error) {
        if (error.response.status === 401) {
            yield put(unsetClient());
            yield put(push('/'));
        }
        yield put({ type: WEATHER_ERROR, error });
    } finally {
        if (yield cancelled()) {
            yield put(push('/'));        }
    }

    return data;
}

function* weatherWatcher() {
    while (true) {
        const { city, country, Api_Key } = yield take(WEATHER_REQUESTING);
        const data = {
            city,
            country,
            Api_Key
        }
        yield fork(weatherFlow, data);
    }
}

export default weatherWatcher;
