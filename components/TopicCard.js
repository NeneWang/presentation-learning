import React, { useState } from 'react';
import {CardContent, Grid, Typography, Card} from '@mui/material';


export default function TopicCard({topic}) {
    return (

        <Grid item xs={12} sm={6} md={6} lg={6} key={topic.id}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {topic.name}
                    </Typography>
                    <Typography color="textSecondary">
                        {topic.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}


