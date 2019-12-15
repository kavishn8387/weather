import React, { PureComponent } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
// import Axios from 'axios';
import { connect } from 'react-redux';
import { weatherRequest } from '../../Redux/modules/weather/action';

class City extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            city: undefined
        }
    }

    getWeatherData = async () => {
        const { city } = this.state;
        const Api_Key = '3fbb2b31fd3e77c536be64abc677a4d1';
        // const Api_Key = '87f8021ca1643afb0356f85b5ec29df2';
        // const Api_Key = 'ec49162285a4d5a007d3a8522f86b30c';
        const country = 'IN';
        console.log('datattatata', city);
        const params = {
            cnt: 10,
            appid: Api_Key,
            units: 'metric',
            // ...requestParams
        };

        const data = {
            city,
            country,
            Api_Key
        }

        this.props.weatherRequest(data);
        // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&${country}&appid=${Api_Key}`);
        // const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/weather?q=Pune,in&appid=b6907d289e10d714a6e88b30761fae22`)
        // console.log("== API CALL ReSPON ==", await api_call.json())
        

        // console.log("=== ")
        
        // // const api_call = await fetch(`https://openweathermap.org/api?q${city}`);
        

        // working as expected
        // const api_call = await Axios.get('https://samples.openweathermap.org/data/2.5/weather?q=Pune,in&appid=b6907d289e10d714a6e88b30761fae22');
        
        
        // const api_call = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);        
        
        
        
        
        //     params,
        //     // cancelToken,
        //     transformResponse: (data) => {
        //         let { city, list = [] } = JSON.parse(data);

        //         list = list.map(day => {
        //             return {
        //                 date: day.dt,
        //                 humidity: day.humidity,
        //                 speed: day.speed,
        //                 temp: day.temp,
        //                 main: {
        //                     icon: day.weather[0].icon,
        //                     description: day.weather[0].description
        //                 }
        //             };
        //         });

        //         return { city, list };
        //     }
        // });
        
        // console.log('api call', api_call.data);
    }

    handleChange = (event) => {
        console.log('test');
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
                    <InputLabel
                        // ref={inputLabel}
                        htmlFor="outlined-age-native-simple">
                        List of cities
                    </InputLabel>
                    <Select
                        native
                        // labelWidth={labelWidth}
                        inputProps={{
                            name: 'city',
                            id: 'outlined-age-native-simple',
                        }}
                        value={city}
                        onChange={this.handleChange}
                        // label="Select"
                        fullWidth
                        // displayEmpty
                    >
                        <option value="select" disabled>Select</option>
                        <option value="goa">Goa</option>
                        <option value="pune">Pune</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                    </Select>
                </FormControl>
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
    weatherRequest: (user) => dispatch(weatherRequest(user))
});

// // make Redux state piece of `login` and our action `loginRequest`
// // available in this.props within our component
// const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

// // in our Redux's state, this form will be available in 'form.login'
// const formed = reduxForm({ form: 'login' })(connected);

// export default withRouter(formed);


export default connect(mapStateToProps, mapDispatchToProps)(City);


// export default City;