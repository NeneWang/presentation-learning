import React, { useState, useEffect } from 'react';
import { CardContent, Grid, Typography, Button, Select, MenuItem, TextField } from '@mui/material';

import { postRecording } from '@/api/utils';

export default function Timer({
    setTimerName
}) {
    const [timerSelected, setTimerSelected] = useState(25 * 60); // 25 minutes in seconds
    const [isTimer, setIsTimer] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isFinished, setIsFinished] = useState(false); // TODO: Implement this [1
    const [timeRemaining, setTimeRemaining] = useState(timerSelected);
    const [youtubeLink, setYoutubeLink] = useState('');


    useEffect(() => {
        let interval = null;
        if (isTimer && !isPaused) {
            interval = setInterval(() => {
                setTimeRemaining(prevTimeRemaining => {
                    if (prevTimeRemaining <= 1) {
                        setIsFinished(true);
                        setIsTimer(false);
                        clearInterval(interval);
                        return 0;
                    } else {
                        return prevTimeRemaining - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimer, isPaused, timerSelected]);

    const handleTimeChange = (event) => {
        console.log("handleTimeChange", event.target.value)
        setTimerSelected(event.target.value * 60); // Convert minutes to seconds
        setTimeRemaining(event.target.value * 60);
        setTimerName(`${event.target.value}:00`)
    };

    const handleSubmit = async () => {
        setIsFinished(false)
        console.log("youtubeLink", youtubeLink)
        postRecording(
            {

            }
        )
        
    }


    return (
        <CardContent>
            <br />
            <Grid item xs>
                <Typography variant='h5'>
                    {Math.floor(timeRemaining / 60)}m {timeRemaining % 60}s
                </Typography>
                <Typography variant="" component="div">
                    5 minutes for presenting
                </Typography>
                <Select value={timerSelected / 60} onChange={handleTimeChange}>
                    <MenuItem value={20}>20 minutes</MenuItem>
                    <MenuItem value={25}>25 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={.2}>1 minutes</MenuItem>
                    {/* Add more options as needed */}
                </Select>
            </Grid>
            <br />
            {
                isTimer ? (
                    <div>
                        <Button onClick={() => setIsPaused(!isPaused)}>
                            {isPaused ? 'Continue' : 'Pause'}
                        </Button>
                        <Button onClick={() => {
                            setIsFinished(true);
                            setIsTimer(false)
                        }}>Finish</Button>
                        <Button onClick={() => setTimeRemaining(timerSelected)}>Reset</Button>
                    </div>
                ) : (
                    <Button onClick={() => setIsTimer(true)}>Start</Button>
                )
            }
            {
                isFinished ? (
                    <div>
                        <Typography variant='h5'>
                            Youtube Submisssion Link (You can set it as unlisted link)
                        </Typography>

                        <TextField
                            label="YouTube Link"
                            variant="outlined"
                            onChange={(event) => setYoutubeLink(event.target.value)}
                        />
                        <Button onClick={() => handleSubmit()}>Submit</Button>
                    </div>
                ) : (<></>
                )
            }
        </CardContent>
    );
}