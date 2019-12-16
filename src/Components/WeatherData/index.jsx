import React, { PureComponent } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, List, ListItem, Divider } from '@material-ui/core';
import '../../Containers/Dashboard/styles.css';

class WeatherData extends PureComponent {
    constructor(props) {
        super(props);
        const { title, data} = this.props;
        this.state = {
            title,
            data
        }

    }
    render () {
        const { title, data} = this.state;
        
        return (
            <Grid item xs={12} sm={6} md={12}>
                <Card >
                    <CardHeader
                        title={title}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className="weather-header"
                    />
                    <CardContent>
                        <div
                            // className={classes.cardPricing}
                            className="weather-card-wrapper"
                        >
                            <Typography variant="h6" color="textSecondary">
                            {
                                data.list && <List>
                                    {
                                        data.list.map((item) => (
                                            <React.Fragment>
                                                <ListItem>
                                                    DateTime : {item.dt_txt} <br />
                                                    Weather: {item.weather[0].description} <br />
                                                    Clouds: {item.clouds.all} <br />
                                                    Wind: {item.wind.speed} speed ({item.wind.deg} deg)
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>  
                                        ))
                                    }
                                </List>
                            }

                            {
                                data.coord && <List>
                                    {
                                        <ListItem>
                                            Weather: {data.weather[0].description} <br />
                                            Clouds: {data.clouds.all} <br />
                                            Wind: {data.wind.speed} speed ({data.wind.deg} deg)
                                        </ListItem>
                                    }
                                </List>
                            }
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default WeatherData;