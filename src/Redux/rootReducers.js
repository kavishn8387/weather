import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import example from './modules/example';
import user from './modules/user/reducer';
import login from './modules/login/reducer';
import signup from './modules/signup/reducer';
import pro from './modules/pro/reducer';
import mapi from './modules/mapi/reducer';
import profile from './modules/profile/reducer';
import idleTime from './modules/idleTime/reducer';

export default combineReducers({
    example,
    routing,
    login,
    user,
    signup,
    pro,
    form,
    mapi,
    profile,
    idleTime
});
