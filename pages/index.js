import React from 'react';

import Layout from '@/components/Layout';

export default function HomePage() {
    return <div>
        <Layout>
            <div class="container">
                <h1>Welcome to Presentation Trainer</h1>
                <p>Presentation Trainer is an innovative application designed to help you improve your presentation skills. Whether you're a student, a professional, or just someone looking to boost your public speaking abilities, our app is here to assist you.</p>

                <h2>Key Features:</h2>
                <ul class="features">
                    <li>Record Yourself: Our app allows you to record yourself giving presentations.</li>
                    <li>Random Presentation Topics: Need inspiration? We can provide you with random presentation topic suggestions.</li>
                    <li>Customizable Timers: Choose between 25 or 50-minute presentation sessions, with 5 minutes for presenting, or 40 minutes for crafting and 10 minutes for presenting.</li>
                </ul>
                <p>With Presentation Trainer, you can hone your presentation skills, practice impromptu speaking, and become a more confident and effective communicator.</p>
            </div>
        </Layout>
    </div>;
}