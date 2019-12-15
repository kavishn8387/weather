import { all } from 'redux-saga/effects';
// import { exampleSaga } from './exampleSaga';
import LoginSaga from './loginSaga';

export default function* sagas() {
    yield all([LoginSaga()]);
}
