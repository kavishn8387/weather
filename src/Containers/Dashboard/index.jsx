import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import City from '../../Components/City';
import WeatherData from '../../Components/WeatherData';
import { logoutRequest } from '../../Redux/modules/login/actions';


import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import styles from './styles.js';


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

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

class Dashboard extends PureComponent {
    // componentDidMount = () => {

    // }

    componentWillMount = () => {
        const { login, history, user } = this.props;
        // return !(JSON.stringify(nextProps) == JSON.stringify(this.props) && JSON.stringify(nextState) == JSON.stringify(this.state)); // eslint-disable-line
        console.log('llllll', login, user)
        if (!(login && login.successful && user && user.token === true)) {
            history.push('/');
        }
    }

    logout = () => {
        console.log('logout');
        this.props.logoutRequest();
        this.props.history.push('/');
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container>


                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                                Weather Forecast
                            </Typography>
                            {/* <nav>
                                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                                    Features
                                </Link>
                                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                                    Enterprise
                                </Link>
                                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                                    Support
                                </Link>
                            </nav> */}
                            <Button onClick={this.logout} color="primary" variant="outlined" className={classes.link}>
                                LogOut
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* Hero unit */}
                    <Container maxWidth="sm" component="main" className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Select City
                            <City />
                        </Typography>
                        {/* <Typography variant="h5" align="center" color="textSecondary" component="p">
                            Quickly build an effective pricing table for your potential customers with this layout.
                            It&apos;s built with default Material-UI components with little customization.
                        </Typography> */}
                    </Container>
                    {/* End hero unit */}
                    <Container maxWidth="md" component="main">
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={12} sm={6} md={6}>
                                <WeatherData data="test" title="Current Weather Data" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <WeatherData data="test" title="5 Day Weather Forecast" />
                            </Grid>

                            
                        </Grid>
                    </Container>
                    {/* Footer */}
                    <Container maxWidth="md" component="footer" className={classes.footer}>
                        <Grid container spacing={4} justify="space-evenly">
                            {/* {footers.map(footer => (
                                <Grid item xs={6} sm={3} key={footer.title}>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        {footer.title}
                                    </Typography>
                                    <ul>
                                        {footer.description.map(item => (
                                            <li key={item}>
                                                <Link href="#" variant="subtitle1" color="textSecondary">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            ))} */}
                        </Grid>
                        <Box mt={5}>
                            {/* <Copyright /> */}

                            <Button onClick='' color="primary" variant="outlined" className={classes.link}>
                                About Us
                            </Button>

                        </Box>
                    </Container>
                    {/* End footer */}
                </React.Fragment>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    errors: state.login.errors || 0,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    logoutRequest: () => dispatch(logoutRequest())
});

// // make Redux state piece of `login` and our action `loginRequest`
// // available in this.props within our component
// const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

// // in our Redux's state, this form will be available in 'form.login'
// const formed = reduxForm({ form: 'login' })(connected);

// export default withRouter(formed);


export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

