import React, { useEffect, useState } from 'react';
import { Button, List } from '@mui/material';
import CreateFormForm from '@/components/createForm';
import Layout from '@/components/Layout';
import { getPosts, getForum, respondThread, createForum } from '@/api/utils';

export default function Forum() {
    const [forumsData, setForumsData] = useState([]);
    const [individualPost, setIndividualPost] = useState(null);
    const [parent_id, setParent_id] = useState(0);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const forumsData = await getPosts();
        setForumsData(forumsData);
    };

    const ForumList = () => {
        return (
            <List>
                <List.Item onClick={() => {
                    setIndividualPost(null);
                    setParent_id(0);
                }}>
                    <List.Content>
                        <List.Header>Select Root</List.Header>
                        <List.Description>Create a root thread</List.Description>
                    </List.Content>
                </List.Item>
                {forumsData.map((forum, index) => (
                    <List.Item key={index} className="hoverable-item" onClick={() => {
                        loadIndividualPost(forum.thread_id);
                        setParent_id(forum.thread_id);
                    }}>
                        <List.Content>
                            <List.Header>{forum.body}</List.Header>
                            <List.Description>{forum.created_time}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        );
    };

    const loadIndividualPost = async (id) => {
        const individualPost = await getForum(id);
        setIndividualPost({ ...individualPost });
    };

    const showIndividualForum = (postData) => {
        const individualPost = postData?.forum;
        const comments = postData?.comments;

        if (!individualPost) {
            return null;
        }

        return (
            <List>
                <List.Item>
                    <List.Content>
                        <List.Header>{individualPost.title}</List.Header>
                        <List.Description>
                            {individualPost.body}
                            <br />
                            Created by User ID {individualPost.user_id} on {individualPost.created_time}
                        </List.Description>
                    </List.Content>
                </List.Item>
                {comments.map((comment, index) => (
                    <List.Item key={index} onClick={() => {
                        const post = comment?.forum;
                        loadIndividualPost(post.thread_id);
                        setParent_id(post.thread_id);
                    }}>
                        {showIndividualForum(comment)}
                    </List.Item>
                ))}
            </List>
        );
    };

    return (
        <Layout>
            <h1>Forum</h1>
            {individualPost && showIndividualForum(individualPost)}
            <CreateFormForm getAllPosts={getAllPosts} parent_id={parent_id} loadIndividualPost={loadIndividualPost} />
            <h5>Threads</h5>
            <ForumList />
        </Layout>
    );
}
