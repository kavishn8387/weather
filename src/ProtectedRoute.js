import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

class ProtectedRoute extends React.PureComponent {
    render() {
        const { classes, history, component: Component, user, ...props } = this.props;
        const authenticated = user.token;

        return [
            <Route
                {...props}
                render={(routerProps) => (
                    authenticated
                        ? <Component {...routerProps} />
                        : (
                            <Redirect to={{
                                pathname: '/'
                            }}
                            />
                        )
                )}
            />,
        ];
    }
}


const mapStateToProps = (state) => {
    return { user: state.user };
};


export default connect(mapStateToProps)(ProtectedRoute);


