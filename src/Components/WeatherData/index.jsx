import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import City from '../../Components/City';

class WeatherData extends PureComponent {
    render () {
        const { title, data} = this.props;
        return (
            <Grid container>
                <Grid item>
                    {title}
                </Grid>
                <Grid item>
                    {data}
                </Grid>
            </Grid>
        )
    }
}

export default WeatherData;