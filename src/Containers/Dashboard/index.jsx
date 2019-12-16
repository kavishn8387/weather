import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CssBaseline, Container, AppBar, Box, Card, CardActions, CardContent, CardHeader, Toolbar, Typography, Link, withStyles } from '@material-ui/core';
import City from '../../Components/City';
import WeatherData from '../../Components/WeatherData';
import { logoutRequest } from '../../Redux/modules/login/actions';
import { clearForecast } from '../../Redux/modules/forecast/action';
import { clearWeather } from '../../Redux/modules/weather/action';
import styles from './styles.js';
import { Aboutus } from '../../Components/AboutUs';

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            aboutUs: false
        }
    }

    componentWillMount = () => {
        const { login, history, user } = this.props;
        // console.log('llllll', login, user)
        if (!(login && login.successful && user && user.token === true)) {
            history.push('/');
        }
    }

    logout = () => {
        console.log('logout');
        this.props.logoutRequest();
        this.props.clearForecast();
        this.props.clearWeather();
        this.props.history.push('/');
    }

    openAboutUs = () => {
        this.setState({
            aboutUs: true
        })
    }

    closeHandleClose = () => {
        this.setState({
            aboutUs: false
        })
    }

    render() {
        const { classes, weather, forecast } = this.props;
        const { aboutUs } = this.state;
        // console.log('eweather', weather.data.data, forecast.data.data);
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
                                {weather && weather.data && weather.data.data && <WeatherData data={weather.data.data} title="Current Weather Data" />}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                {forecast && forecast.data && forecast.data.data && <WeatherData data={forecast.data.data} title="5 Day Weather Forecast" />}
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
                            <Button onClick={this.openAboutUs} color="primary" variant="outlined" className={classes.link}>
                                About Us
                            </Button>

                        </Box>
                    </Container>
                    {aboutUs && <Aboutus open handleClose={this.closeHandleClose} />}
                </React.Fragment>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    user: state.user,
    weather: state.weather,
    forecast: state.forecast
});

const mapDispatchToProps = (dispatch) => ({
    logoutRequest: () => dispatch(logoutRequest()),
    clearForecast: () => dispatch(clearForecast()),
    clearWeather: () => dispatch(clearWeather())
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

