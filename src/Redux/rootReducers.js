import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import user from './modules/user/reducer';
import login from './modules/login/reducer';
import weather from './modules/weather/reducer';
import forecast from './modules/forecast/reducer';

export default combineReducers({
    routing,
    login,
    weather,
    forecast,
    user,
    form,
});
