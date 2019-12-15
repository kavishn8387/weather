import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import api from './common/api/module';
import { deviceId } from './common/api/util';
import { unsetClient } from './redux/modules/user/actions';
import { setIdleTimeFlag } from './redux/modules/idleTime/actions';
import { unsetProfile } from './redux/modules/profile/actions';
import { deleteState } from './common/lib/localStorage';
import cardBg from '../assets/images/login-bg.png';

const mapStateToProps = (state) => {
    return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
    unsetClient: () => dispatch(unsetClient()),
    unsetProfile: () => dispatch(unsetProfile()),
    setIdleTimeFlag: (data) => dispatch(setIdleTimeFlag(data))
});

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
        color: '#FFF',
        backgroundColor: '#39a200',
    },
    idlePopUp: {
        // backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backgroundImage: `url(${cardBg})`,
        '& > div': {
            backgroundColor: 'transparent',
        }
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class ProtectedRoute extends React.PureComponent {
    componentDidMount() {
        window.addEventListener('storage', this.onUserNavigate);
        this.intervalID = setInterval(() => this.timeTracker(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    onUserNavigate = () => {
        sessionStorage.setItem('previousTime', Math.floor(Date.now() / 1000));
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    }

    reset = () => {
        const { unsetClient: UnsetClient, unsetProfile: UnsetProfile } = this.props;
        UnsetClient();
        UnsetProfile();
        deleteState();
        localStorage.setItem('loggedOut', false);
    }

    timeTracker = () => {
        const { unsetClient: UnsetClient, unsetProfile: UnsetProfile, setIdleTimeFlag: SetIdleTimeFlag, user } = this.props;
        const currentTime = Math.floor(Date.now() / 1000);
        const previousTime = sessionStorage.getItem('previousTime') || 0;
        const idleTime = currentTime - previousTime;

        if (idleTime > 1800) {
            api.postData('PORT_NIVA', 'logout', { deviceId }).then(() => {
                localStorage.setItem('loggedOut', true);
                localStorage.removeItem('token');
                UnsetClient();
                SetIdleTimeFlag({ time: true, email: user && user.email });
            }).catch((err) => {
                if (err.response.status === 401) {
                    UnsetClient();
                    UnsetProfile();
                    deleteState();
                }
            });
        }
    }

    render() {
        const { classes, history, component: Component, user, ...props } = this.props;
        const authenticated = user.token;

        // console.dir(user);
        return [
            <Route
                onChange={this.onUserNavigate()}
                {...props}
                render={(routerProps) => (
                    authenticated
                        ? <Component {...routerProps} />
                        : (
                            <Redirect to={{
                                pathname: '/',
                                state: {
                                    locked: true,
                                    // value: 0,
                                    // message: Message,
                                    // icon: ['fas', 'check'],
                                    // color: 'green'
                                }
                            }}
                            />
                        )
                )}
            />,
        ];
    }
}

export default withStyles(styles)(ProtectedRoute);

