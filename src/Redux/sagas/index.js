import { all } from 'redux-saga/effects';
// import { exampleSaga } from './exampleSaga';
import LoginSaga from './loginSaga';
import WeatherSaga from './weatherSaga';

export default function* sagas() {
    yield all([LoginSaga(), WeatherSaga()]);
}
