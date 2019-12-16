import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'
import cx from 'classnames';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Typography, Button, CssBaseline, TextField, MuiThemeProvider, Grid, Avatar, FormControlLabel, Container, Checkbox, Link, Box } from '@material-ui/core';
import theme from '../../Common/style/theme';
import loginRequest, { clearError } from '../../Redux/modules/login/actions';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            deviceId: 0,
            emailError: '',
            passwordError: '',
            emailStatus: false,
            passwordStatus: false,
            buttonEnabled: false,
            color: ''
        };
    }

    componentWillMount() {
        window.onpopstate = () => {
            // eslint-disable-next-line
            this.props.history.block();
        };
        const { email } = this.props;
        // let email = localStorage.getItem('email');
        // email = email && email.replace(/\"/g, '');
        if (email) {
            this.setState({ emailStatus: true, email });
        }

        this.setState({ buttonEnabled: false });
    }

    componentDidMount() {
        // eslint-disable-next-line
        this.props.clearError();

        window.onpopstate = this.onBackButtonEvent;
    }

    onBackButtonEvent = (event) => {
        event.preventDefault();
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value }, () => {
            this.validateEmail();
        });
    }

    validateEmail = () => {
        const { email } = this.state;
        const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // eslint-disable-line
        this.setState({
            emailError:
                regexEmail.test(email) ? null : ('enterValidEmail_login'), // eslint-disable-line
            emailStatus: false
        }, () => {
            if (regexEmail.test(email)) {
                this.setState({ emailStatus: true });
            }
        });
    }

    handleChangePassword = (password) => {
        this.setState({ password }, () => {
            this.validatePassword();
        });
    }

    validatePassword = () => {
        const { password } = this.state;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/;
        this.setState({
            passwordError:
                regexPassword.test(password) ? null : ('enterPwd_register'), // eslint-disable-line
            passwordStatus: false
        }, () => {
            if (regexPassword.test(password)) {
                this.setState({ passwordStatus: true });
            }
        });
    }


    login = () => {
        // console.log('test')
        // this.props.history.push('/dashboard');
        const { email, password, deviceId, emailStatus, passwordStatus } = this.state;
        if (emailStatus && passwordStatus) {
            // event.preventDefault();
            const user = { email, password, deviceId };
            // eslint-disable-next-line
            this.props.loginRequest(user);
        }
    }

    check = () => {
        const { email, password } = this.state;
        if (email && password) {
            this.setState({ buttonEnabled: true, color: 'background' });
        } else {
            this.setState({ buttonEnabled: false, color: '' });
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.login();
        }
    };

    componentDidUpdate() {
        const { login, history, user } = this.props;
        if (login && login.successful && user && user.token === true) {
            history.push('/dashboard');
        }

        if (user && user.token === false) {
            this.setState({ message: 'Please enter valid credentials'})
        }
    }

    render() {
        const { message, emailError, passwordError, buttonEnabled, color, email } = this.state;
        const emailBorder = emailError ? { error: true } : {};
        const passwordBorder = passwordError ? { error: true } : {};
        const extProp = buttonEnabled === true ? '' : { disabled: true };
        const { login, history, classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="login-wrapper">
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...emailBorder}
                            color="green"
                            type="text"
                            value={email}
                            onChange={this.handleChangeEmail}
                            onPaste={this.handleChangeEmail}
                            onKeyUp={this.check}
                            className="user-input"
                            key="email"
                            onKeyPress={this.key}
                        />
                        <PasswordInput
                            error={passwordBorder}
                            label="Password" // eslint-disable-line
                            style={cx('marginBottom0', 'marginTop20')}
                            handleChangePassword={this.handleChangePassword}
                            onPaste={this.handleChangePassword}
                            onKeyUp={this.check}
                            key="pass"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={cx(classes.submit, color)}
                            onClick={() => this.login()}

                            {...extProp}
                        >
                            Sign In
                        </Button>
                        {message && <div>{message}</div>}
                        <Grid container style={{display: "block"}}>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    login: state.login,
    errors: state.login.errors || 0,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(clearError()),
    loginRequest: (user) => dispatch(loginRequest(user))
});


export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Login)));
