import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'
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
import './login.less';
import './login.css';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';






import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        // if (isChrome) {
        //     window.onload = () => { // @TODO NEED TO FIND BETTER SOLUTION "LABEL OVERRIDE ISSUE"
        //         document.querySelector("input[name='email']").value = '.';
        //         setTimeout(() => {
        //             document.querySelector("input[name='email']").value = '';
        //             document.querySelector("input[type='password']").value = '';
        //         }, 100);
        //     };
        // }
    }

    // shouldComponentUpdate = () => {
    //     const { login } = this.props;
    //     console.log('login', login);
    //     if
    // }

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

    gotoForgotPassword = () => {
        // eslint-disable-next-line
        this.props.history.push({
            pathname: '/forgotPassword',
            state: {
                forgotPassword: true
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
            console.log('llllll', login, user)
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
        //   const classes = useStyles();

        // console.log('login', login);
        // if(login && login.successful) {
        //     history.push('/dashboard');
        // }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {/* <form className={classes.form} onSubmit={this.login} noValidate> */}
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
                            // id="outlined-email-input"
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
                            // className={cx('btn-submit', color)}
                            // type="button"
                            // fullWidth
                            // variant="contained"
                            // onClick={this.login}
                            // id="loginButton"
                        >
                            Sign In
                        </Button>
                        {message && <div>{message}</div>}
                        <Grid container>
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
                    {/* </form> */}
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
            // <main className="main">
            // <Grid container alignItems="center" className="login-wrapper">
            //     <CssBaseline />
            //     <Grid className="login__container">
            //         <Typography component="title" variant="h4" className="welcome-title">{('welcome') /* eslint-disable-line */}</Typography>
            //         <form className="login-form" noValidate onKeyPress={this._handleKeyPress}>{/*eslint-disable-line*/}
            //             <MuiThemeProvider theme={theme}>
            //                 <TextField
            //                     {...emailBorder}
            //                     id="outlined-email-input"
            //                     label="Email" // eslint-disable-line
            //                     color="green"
            //                     type="text"
            //                     name="email"
            //                     value={email}
            //                     onChange={this.handleChangeEmail}
            //                     onPaste={this.handleChangeEmail}
            //                     onKeyUp={this.check}
            //                     className="user-input"
            //                     margin="normal"
            //                     variant="outlined"
            //                     key="email"
            //                     fullWidth
            //                     autoFocus
            //                     onKeyPress={this.key}
            //                 />
            //                 {emailError && <div className="error">{emailError}</div>}
            //                 <PasswordInput
            //                     error={passwordBorder}
            //                     label="Password" // eslint-disable-line
            //                     style={cx('marginBottom0', 'marginTop20')}
            //                     handleChangePassword={this.handleChangePassword}
            //                     onPaste={this.handleChangePassword}
            //                     onKeyUp={this.check}
            //                     key="pass"
            //                 />
            //                 {passwordError && <div className="error">{passwordError}</div>}
            //                 {
            //                     // eslint-disable-next-line
            //                     this.props.errors != 0 && this.props.errors.error && <div className="error">{this.props.errors.error.message}</div>
            //                 }
            //                 {message && <div>{message}</div>}
            //             </MuiThemeProvider>
            //             <div className="forgetpassword-field">
            //                 <Button
            //                     onClick={this.gotoForgotPassword}
            //                     className="forgetpassword--link"
            //                 >
            //                     {('forgot_password') /*eslint-disable-line*/}
            //                 </Button>
            //             </div>
            //             <Button
            //                 {...extProp}
            //                 className={cx('btn-submit', color)}
            //                 type="button"
            //                 fullWidth
            //                 variant="contained"
            //                 onClick={this.login}
            //                 id="loginButton"

            //             >
            //                 {('login') /*eslint-disable-line*/}
            //             </Button>
            //         </form>
            //     </Grid>
            // </Grid>
        );
    }
}


// Grab only the piece of state we need
const mapStateToProps = (state) => ({
    login: state.login,
    errors: state.login.errors || 0,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(clearError()),
    loginRequest: (user) => dispatch(loginRequest(user))
});

// // make Redux state piece of `login` and our action `loginRequest`
// // available in this.props within our component
// const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

// // in our Redux's state, this form will be available in 'form.login'
// const formed = reduxForm({ form: 'login' })(connected);

// export default withRouter(formed);


export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Login)));

// export default compose(
//     withStyles(styles),
//     connect(mapStateToProps, mapDispatchToProps)
//  )(withRouter(Login))







// export default function SignIn() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }