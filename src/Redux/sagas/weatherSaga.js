import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Axios from 'axios';
// import api from '../../common/api/module';

// We'll use this function to redirect to different routes based on cases
// import history from '../../common/lib/history';

// Our weather constants
import {
    WEATHER_REQUESTING,
    WEATHER_ERROR,
} from '../modules/weather/constants';

import { setWeatherList } from '../modules/weather/action';
import { unsetClient } from '../modules/user/actions';


function weatherApi(statusList) {
    console.log('statuslist', statusList);
    return Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${statusList.city},${statusList.country}&appid=${statusList.Api_Key}`);        

    // return api.postData('PORT_WEATHER', 'GPLgetProList', {
    //     pageNumber: 1,
    //     pageSize: 5
    // }, statusList).then((response) => {
    //     return response;
    // }).catch((error) => {
    //     throw error;
    // });
}


function* weatherFlow(statusList) {
    console.log('statuslist', statusList);

    let data;
    try {
        data = yield call(weatherApi, statusList);
        // inform Redux to set our client token, this is non blocking so...
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
        console.log('statuslist', city);
        const data = {
            city,
            country,
            Api_Key
        }
        yield fork(weatherFlow, data);

        // const task = yield take(WEATHER_REQUESTING, weatherFlow);
        // yield cancel(task);

    }
}

export default weatherWatcher;
