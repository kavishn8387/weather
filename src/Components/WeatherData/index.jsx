import React, { PureComponent } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core';

class WeatherData extends PureComponent {
    render () {
        const { title, data} = this.props;
        return (
            <Grid item xs={12} sm={6} md={12}>
                <Card>
                    <CardHeader
                        title={title}
                        // subheader={tier.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        // action={title === 'Pro' ? <StarIcon /> : null}
                        // className={classes.cardHeader}
                    />
                    <CardContent>
                        <div
                            // className={classes.cardPricing}
                        >
                            {/* <Typography component="h2" variant="h3" color="textPrimary">
                                {data}
                            </Typography> */}
                            <Typography variant="h6" color="textSecondary">
                                {data}
                            </Typography>
                        </div>
                        {/* <ul>
                            {tier.description.map(line => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                    {line}
                                </Typography>
                            ))}
                        </ul> */}
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default WeatherData;