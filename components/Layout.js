import Navbar from "./Navbar";
import React from 'react';
import { Container } from '@mui/material';

export default function Layout(props) {
    return (
        <div>
            <Navbar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
