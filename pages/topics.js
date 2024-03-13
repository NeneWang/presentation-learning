
import { useState } from 'react';
import Layout from "@/components/Layout"
import SearchTopicCard from "@/components/SearchTopicCard"
import { TextField, Button } from '@mui/material';
const { searchTopics } = require('@/api/utils');



export default function TopicPage() {


    const [searchTerm, setSearchTerm] = useState('');
    const [resultTopics, setResultTopics] = useState([]);

    useState(async () => {
        const topics = await searchTopics({ filter: searchTerm });
        setResultTopics(topics);
    }
        , [searchTerm])

    return (
        <Layout>
            <h1>Topics</h1>

{/* <Button>Stuff</Button> */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(event) => {

                    setSearchTerm(event.target.value)

                }}
            /> 

            <Button onClick={async () => {
                const topics = await searchTopics({ filter: searchTerm });
                console.log(topics)
            }}>Search</Button>

            {
                resultTopics.map((topic, index) => (
                    <SearchTopicCard topic={topic} index={index} />
                ))
            }
        </Layout>
    )
}


