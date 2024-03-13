import React from 'react';
import Layout from '@/components/Layout';
import { Grid, Card, CardContent, Typography, TextField, Button, Divider } from '@mui/material';
import { useState } from 'react';
import Timer from '@/components/Timer';
import TopicCard from '@/components/TopicCard';
import PresentationCard from '@/components/PresentationCard';

const randomTopics = [
    {
        "image": null,
        "id": "f9423c40-eff7-46b0-b3c7-a874a66a57e6",
        "categories": [
            "fe7ae450-50cb-4ee5-9fb7-5a84e3ae0e9d"
        ],
        "created_time": "2024-01-18T01:54:48.416855",
        "name": "The History and Impact of Social Media",
        "description": "Trace the evolution of social media platforms and their influence on society.",
        "level": null,
        "updated_time": "2024-01-18T01:54:48.416855"
    },
    {
        "image": null,
        "id": "f2f80d21-fa8c-463b-a836-008ccfc57073",
        "categories": [
            "5267aa2a-3a3f-4767-a4fb-667de87e4997"
        ],
        "created_time": "2024-01-18T01:54:48.331925",
        "name": "Cultural Diversity and Inclusion in the Workplace",
        "description": "Highlight the benefits of diversity and strategies for creating inclusive work environments.",
        "level": null,
        "updated_time": "2024-01-18T01:54:48.331925"
    },
    {
        "image": null,
        "id": "e9bce290-6f55-4ba1-ba25-ef9b945b1464",
        "categories": [
            "3a75552c-68cd-44ac-afd2-699c430bd970"
        ],
        "created_time": "2024-01-18T01:54:47.569506",
        "name": "The Psychology of Decision-Making",
        "description": "Delve into the cognitive processes that drive our choices and decisions.",
        "level": null,
        "updated_time": "2024-01-18T01:54:47.569506"
    }
]
const { randomizeOptions, postUserRecording } = require('@/api/utils');


export default function HomePage() {

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [promptTopics, setPromptTopics] = useState(randomTopics);

    const [topicTitle, setTopicTitle] = useState('');
    const [topicDescription, setTopicDescription] = useState('');
    const [submissionLink, setSubmissionLink] = useState('');

    const [userTopic, setUserTopic] = useState('');
    const [sessionState, setSessionState] = useState(0); // || 0: Choose, 1: Recording, 2: FInished.
    const [timerNameSelected, setTimerNameSelected] = useState(25);

    

    const handleCustomTopicSubmit = () => {
        // Add your code to handle the submitted topic here
        setSelectedTopic('own');
    };

    const handleSpecificTopicSubmit = (specificTopic) => {
        // Add your code to handle the submitted topic here
        console.log('Submitted Topic:', specificTopic);
        setSelectedTopic(specificTopic);
    }

    const selectSampleTopic = (topic) => {
        setSelectedTopic(topic.id);
        setTopicTitle(topic.name);
        setTopicDescription(topic.description);
    }


    const handleCustomUserTopic = (topicTitle) => {
        setUserTopic(topicTitle);
        setTopicTitle(topicTitle);
    }

    const researchSession = <div>



        <Grid container spacing={2}>
            <Timer 
                setTimerName = {setTimerNameSelected}
            />
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Topic Title"
                    variant="outlined"
                    fullWidth
                    value={topicTitle}
                    onChange={(event) => setTopicTitle(event.target.value)} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Topic Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={topicDescription}
                    onChange={(event) => setTopicDescription(event.target.value)} />
            </Grid>
            <Divider />
            <Grid item xs={12}>
                <TextField
                    label="Submission Link (Youtube)"
                    variant="outlined"
                    multiline
                    rows={1}
                    fullWidth
                    value={submissionLink}
                    onChange={(event) => setSubmissionLink(event.target.value)} />
            </Grid>
            {submissionLink &&
                <Grid item>
                    <Button onClick={async () => {


                        const res = await randomizeOptions();
                        setPromptTopics(res);
                        setSessionState(2);

                        postUserRecording({
                            preparation_time: timerNameSelected,
                            start_ch_time: new Date().toISOString(),
                            end_res_time: new Date().toISOString(),
                            resource_link: submissionLink,
                            topic_name: topicTitle,
                            topic_description: topicDescription,
                            topic_tags: [],
                            
                        });
                    }}>Submit</Button>
                </Grid>}

        </Grid>


    </div>;
    const chooseTopicScreen = <div>
        <h1>Choose a Topic.</h1>
        <div>
            <Grid container spacing={2}>
                {promptTopics.map((topic, index) => (
                    <TopicCard topic={topic} selectedTopic={selectedTopic} index={index} handleSpecificTopicSubmit={() => { selectSampleTopic(topic); }} />
                ))}


                <Grid item xs={12} sm={6} md={6} lg={6} key={'own'}>
                    <Card
                        sx={{
                            ...(selectedTopic === 'own' ? {
                                border: '2px solid #3f51b5',
                            } : {}),
                        }}
                        onClick={handleCustomTopicSubmit}

                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Write down your own topic
                            </Typography>
                            <br /><Grid item xs={10}>
                                <TextField
                                    label="Your Topic"
                                    variant="outlined"
                                    fullWidth
                                    value={userTopic}
                                    onChange={(e) => {

                                        handleCustomUserTopic(e.target.value);
                                    }} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>


        </div>


        <Button onClick={async () => {
            const res = await randomizeOptions();
            setPromptTopics(res);
        }}>Randomize</Button>



        <Button onClick={async () => {
            setSessionState(1);
        }}>Start</Button>
    </div>;
    return <div>
        <Layout>

            {sessionState == 0 && chooseTopicScreen}

            {sessionState == 1 && researchSession}
            { sessionState == 2 && 
                <div>
                    <h3>Presentation Completed </h3>
                    <PresentationCard 
                        record={{
                            resource_link: submissionLink,
                            preparation_time: timerNameSelected,
                            start_ch_time: new Date().toISOString(),

                        }}

                        topic={{
                            name: topicTitle,
                            description: topicDescription,
                        }}
                    />
                </div>

            }

        </Layout>
    </div>;
}