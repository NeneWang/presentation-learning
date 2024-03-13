import React, { useState } from 'react';
import Layout from '@/components/Layout';

import SearchTopicCard from '@/components/SearchTopicCard';
import { getBookmarks } from '@/api/utils';

export default function BookmarkPage() {

    const [bookmarks, setBookmarks] = useState([])

    useState(async () => {
        const bookmarks = await getBookmarks();
        setBookmarks(bookmarks);
    }
        , [])

    return (
        <Layout>
            <h1>Bookmarks</h1>

            {
                bookmarks.map((bookmark, index) => (
                    <SearchTopicCard topic={bookmark} index={index} />
                ))
            }

        </Layout>
    )
}



