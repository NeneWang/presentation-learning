import React from 'react';
import { Card, CardContent, Grid, Typography, IconButton, Icon } from '@mui/material';
import { upvoteTopic, bookmarkTopic } from '@/api/utils';


import TurnedInIcon from '@mui/icons-material/TurnedIn';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {CheckCircle, RadioButtonUnchecked} from '@mui/icons-material';

export default function SearchTopicCard({topic, index}) {
    /**
     * Card displayed when looking and searching for cards.
     */
    const [isBookmarked, setIsBookmarked] = React.useState(topic.is_bookmarked);
    const [upvotes, setUpvotes] = React.useState(topic.upvotes??0);

    const [isUpvoted, setIsUpvoted] = React.useState(topic.is_upvoted);

    const handleBookmark = async (topic_id) => {
        const topic = await bookmarkTopic(topic_id);
        setIsBookmarked(!topic.is_bookmarked);
    }

    const handleUpvote = async (topic_id) => {

        await upvoteTopic(topic_id);
        if(isUpvoted){
            setIsUpvoted(false);
            setUpvotes(upvotes - 1);
            
        }else{   
            setUpvotes(upvotes + 1);
            setIsUpvoted(true);
        }
    }

    return (
        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <Card>
                <CardContent>

                    <Typography variant="h5" component="div">
                      
                    {
                        topic.is_completed ? <CheckCircle /> : <RadioButtonUnchecked />
                    }  {topic.name}
                    </Typography>
                    <Typography color="textSecondary">
                        {topic.description}
                    </Typography>
                    <IconButton onClick={() => handleBookmark(topic.id)}>
                     {
                        isBookmarked ? <TurnedInIcon color="primary" /> : <TurnedInIcon />
                     }
                    </IconButton>
                    <IconButton onClick={() => handleUpvote(topic.id)}>
                    
                    {upvotes} {
                        isUpvoted ? <ThumbUpIcon color="primary" /> : <ThumbUpIcon />
                    }
                    </IconButton>
                </CardContent>
            </Card>
        </Grid>
    )
}