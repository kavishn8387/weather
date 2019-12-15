import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Typography, Button, CssBaseline, TextField, MuiThemeProvider, Grid } from '@material-ui/core';
// import theme from '../../../../style/theme';
import theme from '../../Common/style/theme';
import loginRequest, { clearError } from '../../Redux/modules/login/actions';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
// import { deviceId as uid } from '../../../common/api/util';

// import '../../../../assets/less/main.less';
import './auth.less';
import Login from '../../Components/Login';

class Auth extends PureComponent {
    render() {
        return (
            <Grid>
                <Login />
            </Grid>
        );
    }
}



export default withRouter(Auth);