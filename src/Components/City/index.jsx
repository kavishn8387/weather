import React, { PureComponent } from 'react';
import { Grid, MenuItem, Select } from '@material-ui/core';
import Axios from 'axios';

class City extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            city: undefined
        }
    }

    getWeatherData = async () => {
        const { city } = this.state;
        // const Api_Key = '3fbb2b31fd3e77c536be64abc677a4d1';
        // const Api_Key = '87f8021ca1643afb0356f85b5ec29df2';
        const Api_Key = 'ec49162285a4d5a007d3a8522f86b30c';
        const country = 'IN';
        console.log('datattatata', city);
        const params = {
            cnt: 10,
            appid: Api_Key,
            units: 'metric',
            // ...requestParams
        };
        // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&${country}&appid=${Api_Key}`);
        const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/weather?q=Pune,in&appid=b6907d289e10d714a6e88b30761fae22`);
        // const api_call = await fetch(`https://openweathermap.org/api?q${city}`);
        
        // const api_call = Axios.get('https://api.openweathermap.org/data/2.5/forecast/daily', {
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
        
        console.log('api call', api_call);
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
                <Grid>
                    <Select
                            value={city}
                            onChange={this.handleChange}
                            label="Select"
                            displayEmpty
                        >
                        <MenuItem value="select" disabled>Select</MenuItem>
                        <MenuItem value="goa">Goa</MenuItem>
                        <MenuItem value="pune">Pune</MenuItem>
                        <MenuItem value="mumbai">Mumbai</MenuItem>
                        <MenuItem value="delhi">Delhi</MenuItem>
                        {/* <MenuItem value="son">Son</MenuItem>
                        <MenuItem value="daughter">Daughter</MenuItem>
                        <MenuItem value="other">Other</MenuItem> */}
                    </Select>
                </Grid>
                <Grid>
                    
                </Grid>
            </Grid>
        )
    }
}

export default City;