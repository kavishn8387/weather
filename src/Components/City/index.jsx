import React, { PureComponent } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
// import Axios from 'axios';
import { connect } from 'react-redux';
import { weatherRequest } from '../../Redux/modules/weather/action';
import { forecastRequest } from '../../Redux/modules/forecast/action';

class City extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            city: ''
        }
    }

    componentWillMount = () => {
        const { forecast } = this.props;
        forecast && forecast.data && forecast.data.data && this.setState({
            city: forecast.data.data.city.name
        });
    }

    getWeatherData = async () => {
        const { city } = this.state;
        const Api_Key = '3fbb2b31fd3e77c536be64abc677a4d1';
        // const Api_Key = '87f8021ca1643afb0356f85b5ec29df2';
        // const Api_Key = 'ec49162285a4d5a007d3a8522f86b30c';
        const country = 'IN';
        const data = {
            city,
            country,
            Api_Key
        }

        this.props.weatherRequest(data);
        this.props.forecastRequest(data);
    }

    handleChange = (event) => {
        this.setState({
            city: event.target.value
        }, () => {
            this.getWeatherData();
        });
    }
    render () {
        const { city } = this.state;
        return (
            <Grid>
                <FormControl
                    variant="outlined"
                    fullWidth
                    // className={classes.formControl}
                >
                    <Select
                        native
                        value={city}
                        onChange={this.handleChange}
                        fullWidth
                        placeholder="List of cities"
                        InputLabel="Select"
                    >
                        <option value="select" disabled>Select</option>
                        <option value="Mapusa">Mapusa</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                    </Select>
                </FormControl>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    errors: state.login.errors || 0,
    user: state.user,
    forecast: state.forecast

});

const mapDispatchToProps = (dispatch) => ({
    weatherRequest: (data) => dispatch(weatherRequest(data)),
    forecastRequest: (data) => dispatch(forecastRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(City);
