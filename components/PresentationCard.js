import React, { useState } from 'react';
import { CardContent, Grid, Typography, Card, Checkbox, Avatar } from '@mui/material';

// import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
// import { CheckCircle, RadioButtonUnchecked } from '@material-ui/icons';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
/**
 * 
 * <ListItem key={record.id}>
    <ListItemText
        primary={record.topic.name}
        secondary={`Preparation Time ${record?.preparation_time??0}\n\
        | Duration: ${getDurationInSeconds(record.start_ch_time, record.end_res_time)??0} seconds`}
    />
</ListItem>
 */
export default function PresentationCard({ record, topic }) {

    console.log('Record', record);
    console.log('Topic', topic);

    const extractDateFormatted = (date) => {
        /**
         * Format as 2024-01-18
         */
        const dateObj = new Date(date);
        return dateObj.toDateString();
    }

    return (

        <Grid item xs={12} sm={6} md={6} lg={6}>

            <br />
            <Card>
                {record.topic?.is_completed && (
                    <Avatar sx={{ bgcolor: 'transparent', color: record.topic.is_completed ? 'success.dark' : 'action.active' }}>
                        {record.topic.is_completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                    </Avatar>
                )}


                <CardContent>
                    <Typography variant="h5" component="div">
                        {topic.name}
                    </Typography>

                    <Typography>
                        Submitted {
                            extractDateFormatted(record.start_ch_time)
                        }
                    </Typography>

                    <Typography>
                        Preparation Organization: {record?.preparation_time ?? 0} minutes
                    </Typography>


                    <Typography color="textSecondary">
                        {topic.description ?? 'No Description'}
                    </Typography>


                    <Typography color="textSecondary">
                        {record.resource_link ?? 'Youtube Link Missing'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid >
    )
}


