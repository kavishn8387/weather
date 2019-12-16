import { all } from 'redux-saga/effects';
import LoginSaga from './loginSaga';
import WeatherSaga from './weatherSaga';
import ForecastSaga from './forecastSaga';

export default function* sagas() {
    yield all([LoginSaga(), WeatherSaga(), ForecastSaga()]);
}
