import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import City from '../../Components/City';
import WeatherData from '../../Components/WeatherData';

class Dashboard extends PureComponent {
    // componentDidMount = () => {

    // }
    render () {
        return (
            <Grid container>
                <Grid item>
                    <City />
                </Grid>
                <Grid item>
                    <WeatherData data="test" title="hello"/>
                    <WeatherData data="test" title="hello"/>
                </Grid>
            </Grid>
        )
    }
}

export default Dashboard;